
/* ==========================================
   UNIEVENTS — HOME
   Supabase, eventos, filtros e favoritos
========================================== */

// CONFIGURAÇÃO DO SUPABASE

const $ = (id) => document.getElementById(id);
const config = window.UNIEVENTS_CONFIG || {};

const sessaoStorage = {
    getItem(chave) {
        return sessionStorage.getItem(chave)
            ?? localStorage.getItem(chave);
    },

    setItem(chave, valor) {
        const lembrar =
            localStorage.getItem("unievents_lembrar") !== "nao";

        const destino = lembrar ? localStorage : sessionStorage;
        const outro = lembrar ? sessionStorage : localStorage;

        outro.removeItem(chave);
        destino.setItem(chave, valor);
    },

    removeItem(chave) {
        sessionStorage.removeItem(chave);
        localStorage.removeItem(chave);
    }
};

const cliente = (
    window.supabase &&
    config.url &&
    config.publishableKey
) ? window.supabase.createClient(
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
) : null;

// DADOS DOS EVENTOS

const eventos = Array.isArray(window.UNIEVENTS_EVENTOS)
    ? window.UNIEVENTS_EVENTOS
    : [];

let categoriaSelecionada = "";
let textoPesquisa = "";
let usuarioId = "";

// FUNÇÕES AUXILIARES

function escapar(valor) {
    return String(valor ?? "").replace(
        /[&<>"']/g,
        (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[c]
    );
}

function dataBR(data) {
    if (!data) return "A confirmar";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function periodo(evento) {
    if (!evento.fim || evento.fim === evento.data) {
        return dataBR(evento.data);
    }

    return `${dataBR(evento.data)} a ${dataBR(evento.fim)}`;
}

function enderecoSeguro(endereco) {
    try {
        const url = new URL(endereco, window.location.href);

        if (!["http:", "https:"].includes(url.protocol)) {
            return "";
        }

        return url.href;
    } catch {
        return "";
    }
}

// FAVORITOS SALVOS POR USUÁRIO

function chaveFavoritos() {
    return `unievents_favoritos_${usuarioId}`;
}

function obterFavoritos() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(chaveFavoritos()) || "[]"
        );

        return Array.isArray(dados)
            ? dados.map(String)
            : [];
    } catch {
        return [];
    }
}

function estaFavorito(id) {
    return obterFavoritos().includes(String(id));
}

function alternarFavorito(id) {
    const favoritos = obterFavoritos();
    const valor = String(id);
    const indice = favoritos.indexOf(valor);

    if (indice >= 0) {
        favoritos.splice(indice, 1);
    } else {
        favoritos.push(valor);
    }

    localStorage.setItem(
        chaveFavoritos(),
        JSON.stringify(favoritos)
    );

    renderizarEventos();
}

function criarBotaoFavorito(evento) {
    const marcado = estaFavorito(evento.id);

    return `
    <button
      type="button"
      class="favorito ${marcado ? "marcado" : ""}"
      data-favorito="${escapar(evento.id)}"
      aria-pressed="${marcado}"
      aria-label="${marcado ? "Remover" : "Adicionar"} favorito: ${escapar(evento.titulo)}"
      title="${marcado ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
    >${marcado ? "♥" : "♡"}</button>
  `;
}

// IMAGENS DOS EVENTOS
// Usa as URLs do catálogo.
// Se a imagem falhar, mostra o visual padrão
// do UniEvents, sem foto de outra instituição.

function criarImagem(evento) {
    const imagem = evento.imagem
        ? enderecoSeguro(evento.imagem)
        : "";

    const placeholder = `
      <div class="card-imagem-placeholder" ${imagem ? "hidden" : ""}>
        <span class="placeholder-simbolo">▦</span>
        <span>${escapar(evento.categoria)}</span>
        <small>UniEvents</small>
      </div>
    `;

    if (!imagem) return placeholder;

    const credito = evento.creditoImagem
        ? `<small class="credito-imagem">${escapar(evento.creditoImagem)}</small>`
        : "";

    return `
      <img
        src="${escapar(imagem)}"
        alt="Imagem relacionada ao evento: ${escapar(evento.titulo)}"
        loading="lazy"
        onerror="this.hidden=true;this.nextElementSibling.hidden=false"
      >
      ${placeholder}
      ${credito}
    `;
}

// LINK EXTERNO OFICIAL

function criarLink(evento) {
    const link = enderecoSeguro(evento.link);

    if (!link) {
        return `<span class="sem-link">Link indisponível</span>`;
    }

    return `
    <a
      href="${escapar(link)}"
      target="_blank"
      rel="noopener noreferrer"
    >Site oficial ↗</a>
  `;
}

// CARD GRANDE

function criarCard(evento) {
    return `
    <article class="card">
      <div class="card-imagem">
        ${criarImagem(evento)}
        ${criarBotaoFavorito(evento)}
      </div>

      <div class="card-conteudo">
        <span class="categoria-texto">
          ${escapar(evento.categoria)}
        </span>

        <h3>${escapar(evento.titulo)}</h3>

        <p class="card-info">
          📅 ${periodo(evento)}
        </p>

        <p class="card-info">
          📍 ${escapar(evento.local)}
        </p>

        <p class="card-info descricao-evento">
          ${escapar(evento.descricao)}
        </p>

        <div class="card-rodape">
          <span>${escapar(evento.modalidade)}</span>
          ${criarLink(evento)}
        </div>
      </div>
    </article>
  `;
}

// CARD COMPACTO

function criarProximo(evento) {
    const [ano, mes, dia] = evento.data.split("-");

    return `
    <article class="proximo-card">
      <div class="proximo-imagem">
        ${criarImagem(evento)}
      </div>

      <div class="proximo-conteudo">
        <div class="proximo-topo">
          <div class="data-bloco">
            <span class="data-numero">${escapar(dia)}</span>
            <span class="data-texto">
              ${escapar(mes)}/${escapar(ano)}
            </span>
          </div>

          ${criarBotaoFavorito(evento)}
        </div>

        <span class="categoria-texto">
          ${escapar(evento.categoria)}
        </span>

        <h3>${escapar(evento.titulo)}</h3>

        <p>${escapar(evento.local)}</p>
        <p>${escapar(evento.modalidade)} · ${periodo(evento)}</p>

        ${criarLink(evento)}
      </div>
    </article>
  `;
}

// FILTRAGEM E RENDERIZAÇÃO

function renderizarEventos() {
    const filtrados = eventos
        .filter((evento) => {
            const categoriaOk =
                !categoriaSelecionada ||
                evento.categoria === categoriaSelecionada;

            const texto = [
                evento.titulo,
                evento.categoria,
                evento.descricao,
                evento.local,
                evento.modalidade
            ].join(" ").toLocaleLowerCase("pt-BR");

            return categoriaOk && texto.includes(textoPesquisa);
        })
        .sort((a, b) => a.data.localeCompare(b.data));

    const destaques = filtrados.filter(
        (evento) => evento.destaque
    );

    const proximos = filtrados.filter(
        (evento) => !evento.destaque
    );

    $("destaques").innerHTML = destaques.length
        ? destaques.map(criarCard).join("")
        : `<p class="vazio">Nenhum evento em destaque nesta seleção.</p>`;

    $("proximos").innerHTML = proximos.length
        ? proximos.map(criarProximo).join("")
        : `<p class="vazio">Nenhum outro evento nesta seleção.</p>`;

    const favoritos = eventos.filter(
        (evento) => estaFavorito(evento.id)
    );

    $("favoritos-lista").innerHTML = favoritos.length
        ? favoritos.map(criarCard).join("")
        : `<p class="vazio">Você ainda não possui eventos favoritos.</p>`;
}

// PESQUISA

$("pesquisa")?.addEventListener("input", (evento) => {
    textoPesquisa = evento.target.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    renderizarEventos();
});

$("pesquisa-form")?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    $("secao-destaques").scrollIntoView({
        behavior: "smooth"
    });
});

// CATEGORIAS

$("categorias")?.addEventListener("click", (evento) => {
    const botao = evento.target.closest(
        "button[data-categoria]"
    );

    if (!botao) return;

    const escolhida = botao.dataset.categoria;

    categoriaSelecionada =
        categoriaSelecionada === escolhida
            ? ""
            : escolhida;

    document.querySelectorAll(
        "#categorias button"
    ).forEach((item) => {
        item.classList.toggle(
            "selecionado",
            item.dataset.categoria === categoriaSelecionada
        );
    });

    renderizarEventos();

    $("secao-destaques").scrollIntoView({
        behavior: "smooth"
    });
});

// CLIQUES NOS FAVORITOS

document.addEventListener("click", (evento) => {
    const botao = evento.target.closest(
        "button[data-favorito]"
    );

    if (!botao) return;

    alternarFavorito(botao.dataset.favorito);
});

// PERFIL

$("perfil-link")?.addEventListener("click", (evento) => {
    evento.preventDefault();
    alert("Página de perfil em desenvolvimento.");
});

// LOGOUT

$("logout")?.addEventListener("click", async () => {
    if (!cliente) return;

    const botao = $("logout");
    botao.disabled = true;

    try {
        const { error } = await cliente.auth.signOut();

        if (error) throw error;

        window.location.replace("../Login/index.html");
    } catch (erro) {
        alert("Erro ao sair: " + erro.message);
        botao.disabled = false;
    }
});

// INICIALIZAÇÃO DA HOME

async function iniciarHome() {
    if (!cliente) {
        $("carregando").textContent =
            "Erro na configuração do Supabase.";
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

        renderizarEventos();

        $("conteudo").hidden = false;
        $("carregando").hidden = true;

    } catch (erro) {
        console.error("Erro ao iniciar Home:", erro);

        $("carregando").textContent =
            "Erro ao verificar sessão. Atualize a página.";
    }
}

iniciarHome();
