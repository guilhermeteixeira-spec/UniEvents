
/* ========================================
   UNIEVENTS — HOME
   Autenticação, eventos, busca e favoritos
======================================== */

// 1. CONFIGURAÇÃO DO SUPABASE

const $ = (id) => document.getElementById(id);

const config = window.UNIEVENTS_CONFIG || {};

// Mantém o armazenamento compatível com o Login.
const sessaoStorage = {
    getItem(chave) {
        return sessionStorage.getItem(chave)
            ?? localStorage.getItem(chave);
    },

    setItem(chave, valor) {
        const lembrar =
            localStorage.getItem("unievents_lembrar") !== "nao";

        const destino = lembrar
            ? localStorage
            : sessionStorage;

        const outro = lembrar
            ? sessionStorage
            : localStorage;

        outro.removeItem(chave);
        destino.setItem(chave, valor);
    },

    removeItem(chave) {
        localStorage.removeItem(chave);
        sessionStorage.removeItem(chave);
    }
};

// Cria o cliente Supabase.
const cliente =
    window.supabase &&
        config.url &&
        config.publishableKey
        ? window.supabase.createClient(
            config.url,
            config.publishableKey,
            {
                auth: {
                    storage: sessaoStorage,
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: true
                }
            }
        )
        : null;


// 2. CATÁLOGO DE EVENTOS

const eventos = Array.isArray(window.UNIEVENTS_EVENTOS)
    ? window.UNIEVENTS_EVENTOS
    : [];

let categoria = "";
let busca = "";
let usuarioId = "";


// 3. FUNÇÕES UTILITÁRIAS

function escapeHtml(valor) {
    return String(valor ?? "").replace(
        /[&<>"']/g,
        (caractere) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[caractere]
    );
}

function dataBR(data) {
    const partes = String(data || "").split("-");

    if (partes.length !== 3) {
        return "Data a confirmar";
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function urlSegura(link) {
    try {
        const url = new URL(link);

        if (
            url.protocol === "https:" ||
            url.protocol === "http:"
        ) {
            return url.href;
        }

        return null;
    } catch {
        return null;
    }
}


// 4. FAVORITOS

function chaveFavoritos() {
    return `unievents_favoritos_${usuarioId}`;
}

function obterFavoritos() {
    try {
        const salvos = JSON.parse(
            localStorage.getItem(chaveFavoritos()) || "[]"
        );

        return Array.isArray(salvos) ? salvos : [];
    } catch {
        return [];
    }
}

function eFavorito(id) {
    return obterFavoritos().includes(String(id));
}

function botaoFavorito(evento) {
    const marcado = eFavorito(evento.id);

    return `
    <button
      class="favorito ${marcado ? "marcado" : ""}"
      type="button"
      data-favorito="${escapeHtml(evento.id)}"
      aria-pressed="${marcado}"
      aria-label="${marcado ? "Remover dos" : "Adicionar aos"
        } favoritos: ${escapeHtml(evento.titulo)}"
      title="${marcado ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }"
    >
      ${marcado ? "♥" : "♡"}
    </button>
  `;
}

function alternarFavorito(id) {
    const lista = obterFavoritos();
    const indice = lista.indexOf(String(id));

    if (indice >= 0) {
        lista.splice(indice, 1);
    } else {
        lista.push(String(id));
    }

    localStorage.setItem(
        chaveFavoritos(),
        JSON.stringify(lista)
    );

    renderizarEventos();
}


// 5. LINK PARA O EVENTO OFICIAL

function linkEvento(evento) {
    const link = urlSegura(evento.link);

    if (!link) {
        return `<span class="sem-link">Link indisponível</span>`;
    }

    return `
    <a
      href="${escapeHtml(link)}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Site oficial ↗
    </a>
  `;
}


// 6. CARD DE EVENTO EM DESTAQUE

function criarCard(evento) {
    return `
    <article class="card">

      <div class="card-imagem">
        <div class="card-imagem-placeholder">
          <span>${escapeHtml(evento.categoria)}</span>
        </div>

        ${botaoFavorito(evento)}
      </div>

      <div class="card-conteudo">

        <span class="categoria-texto">
          ${escapeHtml(evento.categoria)}
        </span>

        <h3>${escapeHtml(evento.titulo)}</h3>

        <p class="card-info">
          📅 ${dataBR(evento.data)}
          ${evento.fim ? " a " + dataBR(evento.fim) : ""}
        </p>

        <p class="card-info">
          📍 ${escapeHtml(evento.local)}
        </p>

        <p class="card-info">
          ${escapeHtml(evento.descricao)}
        </p>

        <div class="card-rodape">
          <span>${escapeHtml(evento.modalidade)}</span>
          ${linkEvento(evento)}
        </div>

      </div>
    </article>
  `;
}


// 7. CARD DE PRÓXIMOS EVENTOS

function criarProximo(evento) {
    const partes = String(evento.data || "").split("-");
    const dia = partes[2] || "--";
    const mes = partes[1] || "--";
    const ano = partes[0] || "----";

    return `
    <article class="proximo-card">

      <div class="proximo-topo">

        <div class="data-bloco">
          <span class="data-numero">${escapeHtml(dia)}</span>
          <span class="data-texto">
            ${escapeHtml(mes)}/${escapeHtml(ano)}
          </span>
        </div>

        ${botaoFavorito(evento)}

      </div>

      <span class="categoria-texto">
        ${escapeHtml(evento.categoria)}
      </span>

      <h3>${escapeHtml(evento.titulo)}</h3>

      <p>${escapeHtml(evento.local)}</p>

      <p>
        ${escapeHtml(evento.modalidade)}
        · ${dataBR(evento.data)}
      </p>

      ${linkEvento(evento)}

    </article>
  `;
}


// 8. RENDERIZAÇÃO DOS EVENTOS

function renderizarEventos() {
    const filtrados = eventos.filter((evento) => {
        const correspondeCategoria =
            !categoria || evento.categoria === categoria;

        const texto = [
            evento.titulo,
            evento.categoria,
            evento.descricao,
            evento.local,
            evento.modalidade
        ].join(" ").toLocaleLowerCase("pt-BR");

        const correspondeBusca = texto.includes(busca);

        return correspondeCategoria && correspondeBusca;
    });

    const destaques = filtrados.filter(
        (evento) => evento.destaque
    );

    const proximos = filtrados.filter(
        (evento) => !evento.destaque
    );

    // Eventos em destaque.
    $("destaques").innerHTML = destaques.length
        ? destaques.map(criarCard).join("")
        : `
      <p class="vazio">
        Nenhum evento em destaque nesta seleção.
      </p>
    `;

    // Próximos eventos.
    $("proximos").innerHTML = proximos.length
        ? proximos.map(criarProximo).join("")
        : `
      <p class="vazio">
        Nenhum outro evento nesta seleção.
      </p>
    `;

    // Favoritos do usuário.
    const favoritos = eventos.filter(
        (evento) => eFavorito(evento.id)
    );

    $("favoritos-lista").innerHTML = favoritos.length
        ? favoritos.map(criarCard).join("")
        : `
      <p class="vazio">
        Você ainda não salvou eventos como favoritos.
      </p>
    `;
}


// 9. PESQUISA

$("pesquisa-form")?.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        $("secao-destaques").scrollIntoView({
            behavior: "smooth"
        });
    }
);

$("pesquisa")?.addEventListener("input", (evento) => {
    busca = evento.target.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    renderizarEventos();
});


// 10. FILTRO POR CATEGORIA

$("categorias")?.addEventListener("click", (evento) => {
    const botao = evento.target.closest(
        "button[data-categoria]"
    );

    if (!botao) return;

    const escolhida = botao.dataset.categoria;

    // Clicar novamente remove o filtro.
    categoria = categoria === escolhida
        ? ""
        : escolhida;

    document.querySelectorAll(
        "#categorias button"
    ).forEach((item) => {
        item.classList.toggle(
            "selecionado",
            item.dataset.categoria === categoria
        );
    });

    renderizarEventos();

    $("secao-destaques").scrollIntoView({
        behavior: "smooth"
    });
});


// 11. CLIQUE NOS CORAÇÕES DOS CARDS

document.addEventListener("click", (evento) => {
    const botao = evento.target.closest(
        "button[data-favorito]"
    );

    if (!botao) return;

    alternarFavorito(botao.dataset.favorito);
});


// 12. PERFIL

$("perfil-link")?.addEventListener("click", (evento) => {
    evento.preventDefault();

    alert("Página de perfil em desenvolvimento.");
});


// 13. SAIR DA CONTA

$("logout")?.addEventListener("click", async () => {
    const botao = $("logout");
    botao.disabled = true;

    try {
        const { error } = await cliente.auth.signOut();

        if (error) throw error;

        window.location.replace("../Login/index.html");
    } catch (erro) {
        alert("Não foi possível sair: " + erro.message);
        botao.disabled = false;
    }
});


// 14. VERIFICAR LOGIN E INICIAR A HOME

async function iniciar() {
    if (!cliente) {
        $("carregando").textContent =
            "Supabase não configurado. Verifique Login/config.js.";

        return;
    }

    try {
        const { data, error } = await cliente.auth.getUser();

        if (error || !data.user) {
            window.location.replace("../Login/index.html");
            return;
        }

        const usuario = data.user;

        usuarioId = usuario.id;

        const nome =
            usuario.user_metadata?.full_name ||
            usuario.user_metadata?.name ||
            usuario.email?.split("@")[0] ||
            "Estudante";

        $("usuario-nome").textContent = nome;

        $("avatar").textContent = nome
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((parte) => parte[0].toUpperCase())
            .join("");

        $("saudacao").textContent =
            `Olá, ${nome}! Que bom ter você por aqui!`;

        // Exibe a Home somente após validar a sessão.
        $("conteudo").hidden = false;
        $("carregando").hidden = true;

        // Exibe os eventos do catálogo.
        renderizarEventos();

    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);

        $("carregando").textContent =
            "Erro ao verificar sessão. Atualize a página.";
    }
}

iniciar();
