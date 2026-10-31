
/* ========================================
   UNIEVENTS — PROTEÇÃO DA HOME
   Verificação de autenticação e logout.
   ======================================== */

// 1. CONFIGURAÇÃO DO SUPABASE.
const config = window.UNIEVENTS_CONFIG || {};

const paginaLogin = new URL("../Login/index.html", window.location.href).href;

// 2. REUTILIZA A ESTRATÉGIA DE ARMAZENAMENTO DO LOGIN.
// Isso permite reconhecer sessões salvas no navegador
// ou somente na aba, conforme "Manter conectado".
const sessaoStorage = {
    getItem(chave) {
        return sessionStorage.getItem(chave) ?? localStorage.getItem(chave);
    },
    setItem(chave, valor) {
        const lembrar = localStorage.getItem("unievents_lembrar") !== "nao";

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

// 3. CRIA O CLIENTE DO SUPABASE.
const cliente = window.supabase && config.url && config.publishableKey
    ? window.supabase.createClient(config.url, config.publishableKey, {
        auth: {
            storage: sessaoStorage,
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    })
    : null;

// 4. VERIFICA SE O ESTUDANTE ESTÁ AUTENTICADO.
async function protegerHome() {
    const carregando = document.getElementById("carregando");
    const conteudo = document.getElementById("conteudo");

    if (!cliente) {
        carregando.textContent = "Erro na configuração do Supabase.";
        return;
    }

    try {
        const { data: { user }, error } = await cliente.auth.getUser();

        if (error || !user) {
            window.location.replace(paginaLogin);
            return;
        }

        // Usuário autenticado: libera o conteúdo.
        document.getElementById("usuario-email").textContent =
            `Conectado como: ${user.email}`;

        conteudo.hidden = false;
        carregando.hidden = true;

    } catch (erro) {
        console.error("Erro ao verificar autenticação:", erro);
        window.location.replace(paginaLogin);
    }
}

// 5. ENCERRA A SESSÃO AO CLICAR EM SAIR.
document.getElementById("logout").addEventListener("click", async () => {
    const botao = document.getElementById("logout");
    botao.disabled = true;

    try {
        const { error } = await cliente.auth.signOut();

        if (error) throw error;

        window.location.replace(paginaLogin);

    } catch (erro) {
        console.error("Erro ao sair da conta:", erro);
        alert("Não foi possível sair. Tente novamente.");
        botao.disabled = false;
    }
});

// 6. EXECUTA A PROTEÇÃO QUANDO A PÁGINA CARREGA.
protegerHome();
