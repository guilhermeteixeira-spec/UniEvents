
/* =========================================
   UNIEVENTS — HOME
   Autenticação, eventos e interatividade.
   ========================================= */

// 1. CONFIGURAÇÃO DO SUPABASE
const config = window.UNIEVENTS_CONFIG || {};

const paginaLogin = new URL(
    "../Login/index.html",
    window.location.href
).href;

// Mantém a mesma estratégia de sessão usada no Login.
const sessaoStorage = {
    getItem(chave) {
        return sessionStorage.getItem(chave) ??
            localStorage.getItem(chave);
    },

    setItem(chave, valor) {
        const lembrar =
            localStorage.getItem("unievents_lembrar") !== "nao";

        if (lembrar) {
            sessionStorage.removeItem(chave);
            localStorage.setItem(chave, valor);
        } else {
            localStorage.removeItem(chave);
            sessionStorage.setItem(chave, valor);
        }
    },

    removeItem(chave) {
        sessionStorage.removeItem(chave);
        localStorage.removeItem(chave);
    }
};

const cliente = window.supabase &&
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

// 2. EVENTOS DEMONSTRATIVOS
// Estes dados serão substituídos pelos registros
// do banco Supabase em uma etapa posterior.

const eventos = [
    {
        id: 1,
        titulo: "Summit de Inteligência Artificial",
        categoria: "Tecnologia",
        data: "05 nov. 2026",
        horario: "19h às 22h",
        local: "Auditório Central · Campus São Paulo",
        modalidade: "Presencial",
        imagem: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900",
        destaque: true
    },
    {
        id: 2,
        titulo: "Engenharia que transforma",
        categoria: "Engenharia",
        data: "07 nov. 2026",
        horario: "9h às 17h",
        local: "Laboratório de Inovação · Bloco B",
        modalidade: "Presencial",
        imagem: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900",
        destaque: true
    },
    {
        id: 3,
        titulo: "Do campus ao próprio negócio",
        categoria: "Gestão e Negócios",
        data: "10 nov. 2026",
        horario: "18h30 às 21h",
        local: "Online · Transmissão ao vivo",
        modalidade: "Online",
        imagem: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900",
        destaque: true
    },
    {
        id: 4,
        titulo: "Saúde mental na universidade",
        categoria: "Saúde",
        data: "29 out. 2026",
        horario: "14h às 16h",
        local: "Auditório de Saúde · Bloco C",
        modalidade: "Presencial"
    },
    {
        id: 5,
        titulo: "Práticas para uma educação inclusiva",
        categoria: "Educação",
        data: "30 out. 2026",
        horario: "18h30 às 20h30",
        local: "Online · Google Meet",
        modalidade: "Online"
    },
    {
        id: 6,
        titulo: "Direito digital e proteção de dados",
        categoria: "Direito",
        data: "30 out. 2026",
        horario: "19h às 21h",
        local: "Núcleo de Prática Jurídica",
        modalidade: "Presencial"
    },
    {
        id: 7,
        titulo: "Fotografia: olhares do campus",
        categoria: "Arte e Cultura",
        data: "31 out. 2026",
        horario: "10h às 12h",
        local: "Centro Cultural · Campus SP",
        modalidade: "Presencial"
    }
];

let categoriaSelecionada = "";

// 3. CRIA OS CARDS DE DESTAQUE
function criarCard(evento) {
    return `
        <article class="card">
            <div class="card-imagem">
                <img
                    src="${evento.imagem}"
                    alt="Imagem ilustrativa do evento"
                    loading="lazy"
                >
                <button
                    class="favorito"
                    type="button"
                    data-favorito="${evento.id}"
                    aria-label="Favoritar ${evento.titulo}"
                    title="Favoritos serão ativados em breve"
                >♡</button>
            </div>

            <div class="card-conteudo">
                <span class="categoria-texto">
                    ${evento.categoria}
                </span>

                <h3>${evento.titulo}</h3>

                <p class="card-info">
                    ▦ ${evento.data} · ${evento.horario}
                </p>

                <p class="card-info">
                    ♧ ${evento.local}
                </p>

                <div class="card-rodape">
                    <span>Evento demonstrativo</span>
                    <a href="#" data-detalhes="${evento.id}">
                        Ver detalhes
                    </a>
                </div>
            </div>
        </article>
    `;
}

// 4. CRIA OS CARDS DOS PRÓXIMOS EVENTOS
function criarProximoCard(evento) {
    const partes = evento.data.split(" ");
    const dia = partes[0];

    return `
        <article class="proximo-card">
            <div class="proximo-topo">
                <div class="data-bloco">
                    <span class="data-numero">${dia}</span>
                    <span class="data-texto">
                        ${evento.data}<br>
                        ${evento.horario}
                    </span>
                </div>

                <button
                    class="favorito"
                    type="button"
                    data-favorito="${evento.id}"
                    aria-label="Favoritar ${evento.titulo}"
                    title="Favoritos serão ativados em breve"
                >♡</button>
            </div>

            <span class="categoria-texto">
                ${evento.categoria}
            </span>

            <h3>${evento.titulo}</h3>
            <p>♧ ${evento.local}</p>

            <a href="#" data-detalhes="${evento.id}">
                Ver detalhes →
            </a>
        </article>
    `;
}

// 5. EXIBE OS EVENTOS E APLICA FILTROS
function renderizarEventos() {
    const pesquisa = document.getElementById("pesquisa")
        ?.value.toLowerCase().trim() || "";

    const filtrados = eventos.filter(evento => {
        const correspondeCategoria =
            !categoriaSelecionada ||
            evento.categoria === categoriaSelecionada;

        const correspondePesquisa =
            `${evento.titulo} ${evento.categoria} ${evento.local}`
                .toLowerCase()
                .includes(pesquisa);

        return correspondeCategoria && correspondePesquisa;
    });

    const destaques = filtrados.filter(evento => evento.destaque);
    const proximos = filtrados.filter(evento => !evento.destaque);

    document.getElementById("destaques").innerHTML =
        destaques.length
            ? destaques.map(criarCard).join("")
            : '<p>Nenhum destaque encontrado.</p>';

    document.getElementById("proximos").innerHTML =
        proximos.length
            ? proximos.map(criarProximoCard).join("")
            : '<p>Nenhum evento encontrado.</p>';
}

// 6. PESQUISA
document.getElementById("pesquisa")
    ?.addEventListener("input", renderizarEventos);

document.getElementById("pesquisa-form")
    ?.addEventListener("submit", evento => {
        evento.preventDefault();
        renderizarEventos();
    });

// 7. FILTROS POR CATEGORIA
document.querySelectorAll("[data-categoria]")
    .forEach(botao => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.categoria;

            categoriaSelecionada =
                categoriaSelecionada === categoria ? "" : categoria;

            document.querySelectorAll("[data-categoria]")
                .forEach(item => {
                    const ativo =
                        item.dataset.categoria === categoriaSelecionada;

                    item.classList.toggle("selecionado", ativo);
                    item.setAttribute("aria-pressed", String(ativo));
                });

            renderizarEventos();
        });
    });

// 8. FUNCIONALIDADES QUE SERÃO IMPLEMENTADAS
document.addEventListener("click", evento => {
    const favorito = evento.target.closest("[data-favorito]");
    const detalhes = evento.target.closest("[data-detalhes]");

    if (favorito) {
        alert("O sistema de favoritos será integrado ao Supabase em breve.");
    }

    if (detalhes) {
        evento.preventDefault();
        alert("A página de detalhes do evento será desenvolvida em breve.");
    }
});

document.getElementById("meus-eventos")
    ?.addEventListener("click", evento => {
        evento.preventDefault();
        alert("A página Meus eventos será desenvolvida em breve.");
    });

document.getElementById("perfil-link")
    ?.addEventListener("click", evento => {
        evento.preventDefault();
        alert("A página de perfil será desenvolvida em breve.");
    });

// 9. PROTEÇÃO DA HOME
async function protegerHome() {
    const carregando = document.getElementById("carregando");
    const conteudo = document.getElementById("conteudo");

    if (!cliente) {
        carregando.textContent = "Erro na configuração do Supabase.";
        return;
    }

    try {
        const { data: { user }, error } =
            await cliente.auth.getUser();

        if (error || !user) {
            window.location.replace(paginaLogin);
            return;
        }

        // Personaliza o cabeçalho com o usuário autenticado.
        const nome = user.email.split("@")[0];

        document.getElementById("usuario-nome").textContent = nome;

        document.getElementById("avatar").textContent =
            nome.substring(0, 2).toUpperCase();

        document.getElementById("saudacao").textContent =
            `Olá, ${nome}! Que bom ter você por aqui!`;

        // Carrega os eventos demonstrativos.
        renderizarEventos();

        // Libera a interface.
        conteudo.hidden = false;
        carregando.hidden = true;

    } catch (erro) {
        console.error("Erro ao verificar autenticação:", erro);
        window.location.replace(paginaLogin);
    }
}

// 10. LOGOUT
document.getElementById("logout")
    ?.addEventListener("click", async () => {
        const botao = document.getElementById("logout");
        botao.disabled = true;

        try {
            if (!cliente) throw new Error("Supabase indisponível.");

            const { error } = await cliente.auth.signOut();

            if (error) throw error;

            window.location.replace(paginaLogin);

        } catch (erro) {
            console.error("Erro ao sair:", erro);
            alert("Não foi possível sair da conta.");
            botao.disabled = false;
        }
    });

// 11. INICIALIZAÇÃO
protegerHome();
