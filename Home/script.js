
/* ==========================================
   UNIEVENTS — SISTEMA COMPARTILHADO

   Funcionalidades:
   1. Autenticação com Supabase
   2. Identificação da página atual
   3. Eventos em destaque
   4. Catálogo completo
   5. Pesquisa sem acentos
   6. Filtros combinados
   7. Favoritos por usuário
   8. Dados do perfil
   9. Logout

   CORREÇÃO:
   O filtro por período considera a data
   de INÍCIO de cada evento.
========================================== */


// ==========================================
// 1. CONFIGURAÇÃO GERAL
// ==========================================

const $ = (id) => document.getElementById(id);

const paginaAtual = document.body.dataset.pagina || "home";

const config = window.UNIEVENTS_CONFIG || {};

const eventos = Array.isArray(window.UNIEVENTS_EVENTOS)
    ? window.UNIEVENTS_EVENTOS
    : [];

let usuarioAtual = null;
let usuarioId = "";

let categoriaSelecionada = "";
let textoPesquisa = "";
let modalidadeSelecionada = "";
let dataInicial = "";
let dataFinal = "";


// ==========================================
// 2. ARMAZENAMENTO DA SESSÃO
// ==========================================

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
        sessionStorage.removeItem(chave);
        localStorage.removeItem(chave);
    }
};


// ==========================================
// 3. CLIENTE SUPABASE
// ==========================================

const cliente = (
    window.supabase &&
    config.url &&
    config.publishableKey
)
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


// ==========================================
// 4. SEGURANÇA E TEXTO
// ==========================================

function escapar(valor) {

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


// Pesquisa sem diferenciação de acentos.

function normalizarTexto(texto) {

    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}


// Aceita apenas links HTTP e HTTPS.

function enderecoSeguro(endereco) {

    if (!endereco) {
        return "";
    }

    try {

        const url = new URL(
            endereco,
            window.location.href
        );

        if (
            url.protocol !== "https:" &&
            url.protocol !== "http:"
        ) {
            return "";
        }

        return url.href;

    } catch {
        return "";
    }
}


// ==========================================
// 5. FORMATAÇÃO DE DATAS
// ==========================================

function dataBR(data) {

    if (!data) {
        return "A confirmar";
    }

    const partes = String(data).split("-");

    if (partes.length !== 3) {
        return "A confirmar";
    }

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
}


function periodo(evento) {

    if (
        !evento.fim ||
        evento.fim === evento.data
    ) {
        return dataBR(evento.data);
    }

    return (
        `${dataBR(evento.data)} a ` +
        `${dataBR(evento.fim)}`
    );
}


// ==========================================
// 6. ORDENAÇÃO DOS EVENTOS
// ==========================================

function ordenarEventos(lista) {

    return [...lista].sort((a, b) => {

        return String(a.data || "")
            .localeCompare(String(b.data || ""));

    });
}


// ==========================================
// 7. FAVORITOS POR USUÁRIO
// ==========================================

// Mantém a chave utilizada anteriormente.
// Os favoritos já salvos não são apagados.

function chaveFavoritos() {

    return `unievents_favoritos_${usuarioId}`;
}


function obterFavoritos() {

    if (!usuarioId) {
        return [];
    }

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

    if (!usuarioId) {
        return;
    }

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

    renderizarPagina();
}


function criarBotaoFavorito(evento) {

    const marcado = estaFavorito(evento.id);

    return `
        <button
            type="button"
            class="favorito ${marcado ? "marcado" : ""}"
            data-favorito="${escapar(evento.id)}"
            aria-pressed="${marcado}"
            aria-label="${marcado ? "Remover dos" : "Adicionar aos"} favoritos: ${escapar(evento.titulo)}"
            title="${marcado ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
        >
            ${marcado ? "♥" : "♡"}
        </button>
    `;
}


// ==========================================
// 8. IMAGENS DOS EVENTOS
// ==========================================

function criarImagem(evento) {

    const imagem = enderecoSeguro(evento.imagem);

    const placeholder = `
        <div
            class="card-imagem-placeholder"
            ${imagem ? "hidden" : ""}
        >
            <span class="placeholder-simbolo">▦</span>
            <span>${escapar(evento.categoria)}</span>
            <small>UniEvents</small>
        </div>
    `;

    if (!imagem) {
        return placeholder;
    }

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
// 9. LINK OFICIAL DO EVENTO
// ==========================================

function criarLink(evento) {

    const link = enderecoSeguro(evento.link);

    if (!link) {

        return `
            <span class="sem-link">
                Link indisponível
            </span>
        `;
    }

    return `
        <a
            href="${escapar(link)}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Site oficial ↗
        </a>
    `;
}


// ==========================================
// 10. CRIAÇÃO DOS CARDS
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

                <h3>
                    ${escapar(evento.titulo)}
                </h3>

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

                    <span>
                        ${escapar(evento.modalidade)}
                    </span>

                    ${criarLink(evento)}

                </div>

            </div>

        </article>
    `;
}


// ==========================================
// 11. EXIBIÇÃO DOS CARDS
// ==========================================

function preencherCards(id, lista, mensagemVazia) {

    const elemento = $(id);

    if (!elemento) {
        return;
    }

    if (!lista.length) {

        elemento.innerHTML = `
            <p class="vazio">
                ${escapar(mensagemVazia)}
            </p>
        `;

        return;
    }

    elemento.innerHTML = lista
        .map(criarCard)
        .join("");
}


// ==========================================
// 12. FILTRO POR CATEGORIA
// ==========================================

function correspondeCategoria(evento) {

    return !categoriaSelecionada ||
        evento.categoria === categoriaSelecionada;
}


// ==========================================
// 13. FILTRO POR PESQUISA
// ==========================================

function correspondePesquisa(evento) {

    if (!textoPesquisa) {
        return true;
    }

    const conteudo = normalizarTexto([
        evento.titulo,
        evento.categoria,
        evento.descricao,
        evento.local,
        evento.modalidade
    ].join(" "));

    return conteudo.includes(textoPesquisa);
}


// ==========================================
// 14. FILTRO POR MODALIDADE
// ==========================================

function correspondeModalidade(evento) {

    if (!modalidadeSelecionada) {
        return true;
    }

    const modalidade = normalizarTexto(
        evento.modalidade
    );

    if (modalidadeSelecionada === "hibrido") {

        return modalidade.includes("hibrid");

    }

    if (modalidadeSelecionada === "online") {

        return (
            modalidade.includes("online") ||
            modalidade.includes("virtual") ||
            modalidade.includes("remoto")
        );

    }

    if (modalidadeSelecionada === "presencial") {

        return modalidade.includes("presencial");

    }

    return false;
}


// ==========================================
// 15. FILTRO POR DATA — CORRIGIDO
// ==========================================

// NOVA REGRA:
//
// O filtro considera somente a DATA DE INÍCIO
// do evento.
//
// Exemplo:
//
// Filtro: 01/12/2026 até 31/12/2026
//
// Evento A:
// Início: 30/11/2026
// Fim: 02/12/2026
// Resultado: NÃO aparece.
//
// Evento B:
// Início: 03/12/2026
// Fim: 04/12/2026
// Resultado: APARECE.
//
// A data final do evento continua aparecendo
// normalmente no card, mas não interfere
// no filtro.

function correspondePeriodo(evento) {

    if (!dataInicial && !dataFinal) {
        return true;
    }

    const inicioEvento = String(evento.data || "");

    const formatoValido = /^\d{4}-\d{2}-\d{2}$/;

    if (!formatoValido.test(inicioEvento)) {
        return false;
    }

    // Exclui eventos iniciados antes da
    // data inicial selecionada.

    if (
        dataInicial &&
        inicioEvento < dataInicial
    ) {
        return false;
    }

    // Exclui eventos iniciados depois da
    // data final selecionada.

    if (
        dataFinal &&
        inicioEvento > dataFinal
    ) {
        return false;
    }

    return true;
}


// ==========================================
// 16. COMBINAÇÃO DOS FILTROS
// ==========================================

function eventoCorrespondeFiltros(evento) {

    return (
        correspondeCategoria(evento) &&
        correspondePesquisa(evento) &&
        correspondeModalidade(evento) &&
        correspondePeriodo(evento)
    );
}


function datasValidas() {

    return (
        !dataInicial ||
        !dataFinal ||
        dataInicial <= dataFinal
    );
}


// ==========================================
// 17. MENSAGENS DOS FILTROS
// ==========================================

function atualizarMensagemFiltros(total) {

    const resultado = $("resultado-filtros");
    const erro = $("erro-filtros");

    if (!resultado) {
        return;
    }

    if (!datasValidas()) {

        resultado.textContent =
            "Corrija o período para visualizar os eventos.";

        if (erro) {
            erro.hidden = false;
            erro.textContent =
                "A data inicial não pode ser posterior à data final.";
        }

        return;
    }

    if (erro) {
        erro.hidden = true;
        erro.textContent = "";
    }

    const filtrosAtivos = [
        categoriaSelecionada,
        textoPesquisa,
        modalidadeSelecionada,
        dataInicial,
        dataFinal
    ].some(Boolean);

    const descricao = total === 1
        ? "evento encontrado"
        : "eventos encontrados";

    resultado.textContent = filtrosAtivos
        ? `${total} ${descricao} com os filtros selecionados.`
        : `${total} ${descricao} no catálogo.`;
}


// ==========================================
// 18. RENDERIZAÇÃO DA HOME
// ==========================================

function renderizarHome() {

    const destaques = ordenarEventos(
        eventos.filter(
            (evento) => evento.destaque
        )
    );

    preencherCards(
        "destaques",
        destaques,
        "Nenhum evento em destaque disponível."
    );
}


// ==========================================
// 19. RENDERIZAÇÃO DO CATÁLOGO
// ==========================================

function renderizarExplorar() {

    const filtrados = datasValidas()
        ? ordenarEventos(
            eventos.filter(eventoCorrespondeFiltros)
        )
        : [];

    preencherCards(
        "todos-eventos",
        filtrados,
        "Nenhum evento encontrado com os filtros selecionados."
    );

    atualizarMensagemFiltros(filtrados.length);
}


// ==========================================
// 20. RENDERIZAÇÃO DOS FAVORITOS
// ==========================================

function renderizarFavoritos() {

    const favoritos = ordenarEventos(
        eventos.filter(
            (evento) => estaFavorito(evento.id)
        )
    );

    preencherCards(
        "favoritos-lista",
        favoritos,
        "Você ainda não possui eventos favoritos."
    );
}


// ==========================================
// 21. RENDERIZAÇÃO DO PERFIL
// ==========================================

function renderizarPerfil() {

    if (!usuarioAtual) {
        return;
    }

    const nome = obterNomeUsuario(usuarioAtual);

    const email = usuarioAtual.email || "";

    if ($("perfil-nome")) {
        $("perfil-nome").textContent = nome;
    }

    if ($("perfil-nome-campo")) {
        $("perfil-nome-campo").value = nome;
    }

    if ($("perfil-email")) {
        $("perfil-email").value = email;
    }

    if ($("perfil-avatar")) {
        $("perfil-avatar").textContent =
            obterIniciais(nome);
    }
}


// ==========================================
// 22. RENDERIZAÇÃO POR PÁGINA
// ==========================================

function renderizarPagina() {

    switch (paginaAtual) {

        case "home":
            renderizarHome();
            break;

        case "explorar":
            renderizarExplorar();
            break;

        case "favoritos":
            renderizarFavoritos();
            break;

        case "perfil":
            renderizarPerfil();
            break;

        default:
            console.warn(
                "Página não reconhecida:",
                paginaAtual
            );
    }
}


// ==========================================
// 23. PESQUISA
// ==========================================

function configurarPesquisa() {

    const campo = $("pesquisa");
    const formulario = $("pesquisa-form");

    if (!campo || !formulario) {
        return;
    }

    // Na página Explorar, a pesquisa
    // atualiza o catálogo diretamente.

    if (paginaAtual === "explorar") {

        const parametros = new URLSearchParams(
            window.location.search
        );

        const buscaInicial = parametros.get("q") || "";

        campo.value = buscaInicial;

        textoPesquisa = normalizarTexto(buscaInicial);

        campo.addEventListener("input", () => {

            textoPesquisa = normalizarTexto(
                campo.value
            );

            renderizarExplorar();
        });

        formulario.addEventListener(
            "submit",
            (evento) => {

                evento.preventDefault();

                textoPesquisa = normalizarTexto(
                    campo.value
                );

                renderizarExplorar();

                $("secao-todos-eventos")?.scrollIntoView({
                    behavior: "smooth"
                });
            }
        );

    } else {

        // Nas outras páginas, a pesquisa
        // encaminha para Explorar.

        formulario.addEventListener(
            "submit",
            (evento) => {

                evento.preventDefault();

                const busca = campo.value.trim();

                const destino = new URL(
                    "../Explorar/index.html",
                    window.location.href
                );

                if (busca) {
                    destino.searchParams.set(
                        "q",
                        busca
                    );
                }

                window.location.href = destino.href;
            }
        );
    }
}


// ==========================================
// 24. SELEÇÃO DE CATEGORIAS
// ==========================================

function configurarCategorias() {

    const categorias = $("categorias");

    if (!categorias) {
        return;
    }

    categorias.addEventListener(
        "click",
        (evento) => {

            const botao = evento.target.closest(
                "button[data-categoria]"
            );

            if (!botao) {
                return;
            }

            const escolhida = botao.dataset.categoria;

            categoriaSelecionada =
                categoriaSelecionada === escolhida
                    ? ""
                    : escolhida;

            categorias.querySelectorAll(
                "button[data-categoria]"
            ).forEach((item) => {

                item.classList.toggle(
                    "selecionado",
                    item.dataset.categoria ===
                    categoriaSelecionada
                );
            });

            renderizarExplorar();

            $("secao-todos-eventos")?.scrollIntoView({
                behavior: "smooth"
            });
        }
    );
}


// ==========================================
// 25. FILTROS AVANÇADOS
// ==========================================

function configurarFiltros() {

    const modalidade = $("filtro-modalidade");
    const inicio = $("filtro-data-inicio");
    const fim = $("filtro-data-fim");
    const limpar = $("limpar-filtros");

    modalidade?.addEventListener(
        "change",
        () => {

            modalidadeSelecionada = modalidade.value;

            renderizarExplorar();
        }
    );

    inicio?.addEventListener(
        "change",
        () => {

            dataInicial = inicio.value;

            renderizarExplorar();
        }
    );

    fim?.addEventListener(
        "change",
        () => {

            dataFinal = fim.value;

            renderizarExplorar();
        }
    );

    limpar?.addEventListener(
        "click",
        () => {

            categoriaSelecionada = "";
            textoPesquisa = "";
            modalidadeSelecionada = "";
            dataInicial = "";
            dataFinal = "";

            if ($("pesquisa")) {
                $("pesquisa").value = "";
            }

            if (modalidade) {
                modalidade.value = "";
            }

            if (inicio) {
                inicio.value = "";
            }

            if (fim) {
                fim.value = "";
            }

            document.querySelectorAll(
                "#categorias button[data-categoria]"
            ).forEach((botao) => {

                botao.classList.toggle(
                    "selecionado",
                    botao.dataset.categoria === ""
                );
            });

            if (window.location.search) {

                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname
                );
            }

            renderizarExplorar();
        }
    );
}


// ==========================================
// 26. CLIQUES NOS FAVORITOS
// ==========================================

function configurarFavoritos() {

    document.addEventListener(
        "click",
        (evento) => {

            const botao = evento.target.closest(
                "button[data-favorito]"
            );

            if (!botao) {
                return;
            }

            alternarFavorito(
                botao.dataset.favorito
            );
        }
    );
}


// ==========================================
// 27. NOME E INICIAIS DO USUÁRIO
// ==========================================

function obterNomeUsuario(usuario) {

    return (
        usuario.user_metadata?.full_name ||
        usuario.user_metadata?.name ||
        usuario.email?.split("@")[0] ||
        "Estudante"
    );
}


function obterIniciais(nome) {

    return String(nome)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) =>
            parte.charAt(0).toUpperCase()
        )
        .join("");
}


// ==========================================
// 28. PREENCHIMENTO DO CABEÇALHO
// ==========================================

function preencherUsuario(usuario) {

    const nome = obterNomeUsuario(usuario);

    if ($("usuario-nome")) {

        $("usuario-nome").textContent = nome;
    }

    if ($("avatar")) {

        $("avatar").textContent =
            obterIniciais(nome);
    }

    if ($("saudacao")) {

        $("saudacao").textContent =
            `Olá, ${nome}! Que bom ter você por aqui!`;
    }
}


// ==========================================
// 29. LOGOUT
// ==========================================

function configurarLogout() {

    const botao = $("logout");

    if (!botao) {
        return;
    }

    botao.addEventListener(
        "click",
        async () => {

            if (!cliente) {
                return;
            }

            botao.disabled = true;

            try {

                const { error } =
                    await cliente.auth.signOut();

                if (error) {
                    throw error;
                }

                window.location.replace(
                    "../Login/index.html"
                );

            } catch (erro) {

                console.error(
                    "Erro ao sair:",
                    erro
                );

                alert(
                    "Não foi possível sair. Tente novamente."
                );

                botao.disabled = false;
            }
        }
    );
}


// ==========================================
// 30. INICIALIZAÇÃO DO SISTEMA
// ==========================================

async function iniciarUniEvents() {

    const carregando = $("carregando");

    if (!cliente) {

        if (carregando) {

            carregando.textContent =
                "Erro na configuração do Supabase.";
        }

        return;
    }

    try {

        const { data, error } =
            await cliente.auth.getUser();

        if (error || !data?.user) {

            window.location.replace(
                "../Login/index.html"
            );

            return;
        }

        usuarioAtual = data.user;
        usuarioId = data.user.id;

        preencherUsuario(usuarioAtual);

        configurarPesquisa();
        configurarCategorias();
        configurarFiltros();
        configurarFavoritos();
        configurarLogout();

        renderizarPagina();

        if ($("conteudo")) {
            $("conteudo").hidden = false;
        }

        if (carregando) {
            carregando.hidden = true;
        }

    } catch (erro) {

        console.error(
            "Erro ao iniciar UniEvents:",
            erro
        );

        if (carregando) {

            carregando.textContent =
                "Erro ao verificar sua sessão. Atualize a página.";
        }
    }
}


// ==========================================
// 31. INICIAR SISTEMA
// ==========================================

iniciarUniEvents();
