
/* ==========================================
   UNIEVENTS — HOME
   Supabase, eventos, filtros e favoritos
========================================== */

// ==========================================
// 1. CONFIGURAÇÃO DO SUPABASE
// ==========================================

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

// ==========================================
// 2. DADOS DOS EVENTOS E ESTADO DOS FILTROS
// ==========================================

const eventos = Array.isArray(window.UNIEVENTS_EVENTOS)
    ? window.UNIEVENTS_EVENTOS
    : [];

let categoriaSelecionada = "";
let textoPesquisa = "";
let modalidadeSelecionada = "";
let dataInicial = "";
let dataFinal = "";
let usuarioId = "";

// ==========================================
// 3. FUNÇÕES AUXILIARES
// ==========================================

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

// Remove acentos e ignora maiúsculas/minúsculas.
function normalizarTexto(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}

function dataBR(data) {
    if (!data) return "A confirmar";

    const partes = String(data).split("-");

    if (partes.length !== 3) return "A confirmar";

    const [ano, mes, dia] = partes;
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

// ==========================================
// 4. FAVORITOS SALVOS POR USUÁRIO
// ==========================================

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

// ==========================================
// 5. IMAGENS DOS EVENTOS
// ==========================================

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

// ==========================================
// 6. LINK OFICIAL DO EVENTO
// ==========================================

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

// ==========================================
// 7. CARD GRANDE
// ==========================================

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
                    📅 ${escapar(periodo(evento))}
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

// ==========================================
// 8. CARD COMPACTO
// ==========================================

function criarProximo(evento) {
    const partes = String(evento.data || "").split("-");
    const [ano = "", mes = "", dia = "--"] = partes;

    return `
        <article class="proximo-card">

            <div class="proximo-imagem">
                ${criarImagem(evento)}
            </div>

            <div class="proximo-conteudo">

                <div class="proximo-topo">

                    <div class="data-bloco">

                        <span class="data-numero">
                            ${escapar(dia)}
                        </span>

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

                <p>
                    ${escapar(evento.modalidade)} ·
                    ${escapar(periodo(evento))}
                </p>

                ${criarLink(evento)}

            </div>

        </article>
    `;
}

// ==========================================
// 9. FILTRO POR CATEGORIA
// ==========================================

function correspondeCategoria(evento) {
    return !categoriaSelecionada ||
        evento.categoria === categoriaSelecionada;
}

// ==========================================
// 10. FILTRO DE PESQUISA SEM ACENTOS
// ==========================================

function correspondePesquisa(evento) {
    const texto = normalizarTexto([
        evento.titulo,
        evento.categoria,
        evento.descricao,
        evento.local,
        evento.modalidade
    ].join(" "));

    return texto.includes(textoPesquisa);
}

// ==========================================
// 11. FILTRO POR MODALIDADE
// ==========================================

function correspondeModalidade(evento) {
    if (!modalidadeSelecionada) {
        return true;
    }

    const modalidade = normalizarTexto(evento.modalidade);

    // Aceita "Híbrido" e "Hibrido".
    // Também aceita textos como "Evento presencial".
    if (modalidadeSelecionada === "hibrido") {
        return modalidade.includes("hibrid");
    }

    if (modalidadeSelecionada === "online") {
        return modalidade.includes("online") ||
            modalidade.includes("virtual") ||
            modalidade.includes("remoto");
    }

    if (modalidadeSelecionada === "presencial") {
        return modalidade.includes("presencial");
    }

    return false;
}

// ==========================================
// 12. FILTRO POR PERÍODO
// ==========================================

// As datas do catálogo usam o padrão AAAA-MM-DD.
// Nesse formato, podemos compará-las diretamente,
// desde que estejam preenchidas corretamente.
//
// Eventos com vários dias são incluídos quando
// seu período cruza o intervalo pesquisado.

function correspondePeriodo(evento) {
    if (!dataInicial && !dataFinal) {
        return true;
    }

    const inicioEvento = String(evento.data || "");
    const fimEvento = String(evento.fim || evento.data || "");

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(inicioEvento) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(fimEvento)
    ) {
        return false;
    }

    // Evento terminou antes do início selecionado.
    if (dataInicial && fimEvento < dataInicial) {
        return false;
    }

    // Evento começa depois do fim selecionado.
    if (dataFinal && inicioEvento > dataFinal) {
        return false;
    }

    return true;
}

// ==========================================
// 13. COMBINAÇÃO DE TODOS OS FILTROS
// ==========================================

function eventoCorrespondeFiltros(evento) {
    return correspondeCategoria(evento) &&
        correspondePesquisa(evento) &&
        correspondeModalidade(evento) &&
        correspondePeriodo(evento);
}

// ==========================================
// 14. VALIDAÇÃO DAS DATAS
// ==========================================

function datasValidas() {
    return !dataInicial ||
        !dataFinal ||
        dataInicial <= dataFinal;
}

function atualizarMensagemFiltros(total, erro = "") {
    const resultado = $("resultado-filtros");
    const mensagemErro = $("erro-filtros");

    if (mensagemErro) {
        mensagemErro.hidden = !erro;
        mensagemErro.textContent = erro;
    }

    if (!resultado) return;

    if (erro) {
        resultado.textContent =
            "Corrija o período selecionado para visualizar os resultados.";
        return;
    }

    const filtrosAtivos = [
        Boolean(categoriaSelecionada),
        Boolean(textoPesquisa),
        Boolean(modalidadeSelecionada),
        Boolean(dataInicial),
        Boolean(dataFinal)
    ].filter(Boolean).length;

    const palavra = total === 1 ? "evento encontrado" : "eventos encontrados";

    resultado.textContent = filtrosAtivos
        ? `${total} ${palavra} com os filtros selecionados.`
        : `${total} ${palavra} no catálogo.`;
}

// ==========================================
// 15. RENDERIZAÇÃO DOS EVENTOS
// ==========================================

function renderizarEventos() {
    const periodoValido = datasValidas();

    const filtrados = periodoValido
        ? eventos
            .filter(eventoCorrespondeFiltros)
            .sort((a, b) =>
                String(a.data || "").localeCompare(
                    String(b.data || "")
                )
            )
        : [];

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

    // Os favoritos continuam independentes dos filtros.
    // Assim, os eventos salvos permanecem acessíveis
    // mesmo quando o usuário faz uma pesquisa.

    const favoritos = eventos.filter(
        (evento) => estaFavorito(evento.id)
    );

    $("favoritos-lista").innerHTML = favoritos.length
        ? favoritos.map(criarCard).join("")
        : `<p class="vazio">Você ainda não possui eventos favoritos.</p>`;

    atualizarMensagemFiltros(
        filtrados.length,
        periodoValido
            ? ""
            : "A data inicial não pode ser posterior à data final."
    );
}

// ==========================================
// 16. PESQUISA SEM ACENTOS
// ==========================================

$("pesquisa")?.addEventListener("input", (evento) => {
    textoPesquisa = normalizarTexto(evento.target.value);
    renderizarEventos();
});

$("pesquisa-form")?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    $("secao-destaques").scrollIntoView({
        behavior: "smooth"
    });
});

// ==========================================
// 17. CATEGORIAS
// ==========================================

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

// ==========================================
// 18. FILTRO POR MODALIDADE
// ==========================================

$("filtro-modalidade")?.addEventListener(
    "change",
    (evento) => {
        modalidadeSelecionada = evento.target.value;
        renderizarEventos();
    }
);

// ==========================================
// 19. FILTRO POR DATA INICIAL
// ==========================================

$("filtro-data-inicio")?.addEventListener(
    "change",
    (evento) => {
        dataInicial = evento.target.value;
        renderizarEventos();
    }
);

// ==========================================
// 20. FILTRO POR DATA FINAL
// ==========================================

$("filtro-data-fim")?.addEventListener(
    "change",
    (evento) => {
        dataFinal = evento.target.value;
        renderizarEventos();
    }
);

// ==========================================
// 21. LIMPAR TODOS OS FILTROS
// ==========================================

$("limpar-filtros")?.addEventListener("click", () => {
    categoriaSelecionada = "";
    textoPesquisa = "";
    modalidadeSelecionada = "";
    dataInicial = "";
    dataFinal = "";

    $("pesquisa").value = "";
    $("filtro-modalidade").value = "";
    $("filtro-data-inicio").value = "";
    $("filtro-data-fim").value = "";

    document.querySelectorAll(
        "#categorias button"
    ).forEach((botao) => {
        botao.classList.toggle(
            "selecionado",
            botao.dataset.categoria === ""
        );
    });

    renderizarEventos();
});

// ==========================================
// 22. CLIQUES NOS FAVORITOS
// ==========================================

document.addEventListener("click", (evento) => {
    const botao = evento.target.closest(
        "button[data-favorito]"
    );

    if (!botao) return;

    alternarFavorito(botao.dataset.favorito);
});

// ==========================================
// 23. PERFIL
// ==========================================

$("perfil-link")?.addEventListener("click", (evento) => {
    evento.preventDefault();

    alert("Página de perfil em desenvolvimento.");
});

// ==========================================
// 24. LOGOUT
// ==========================================

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

// ==========================================
// 25. INICIALIZAÇÃO DA HOME
// ==========================================

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
