/* ========================================
   UNIEVENTS — AUTENTICAÇÃO COM SUPABASE
   Cadastro, login, recuperação e mensagens.
   ======================================== */

// 1. CONFIGURAÇÃO: usa apenas a chave PÚBLICA do projeto.
const config = window.UNIEVENTS_CONFIG || {};
const configurado = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.url || "")
    && /^sb_publishable_/.test(config.publishableKey || "");

// 2. ARMAZENAMENTO DA SESSÃO: navegador ou apenas aba atual.
// A escolha é feita ANTES do login. Nunca armazenamos a senha.
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

const cliente = configurado && window.supabase
    ? window.supabase.createClient(config.url, config.publishableKey, {
        auth: { storage: sessaoStorage, persistSession: true, autoRefreshToken: true,
            detectSessionInUrl: true }
    })
    : null;

// 3. FUNÇÕES UTILITÁRIAS.
const elemento = (id) => document.getElementById(id);
const paginaLogin = new URL("index.html", window.location.href).href;
const paginaRedefinir = new URL("redefinir.html", window.location.href).href;
function mensagem(texto, erro = false) {
    const area = elemento("login-message");
    if (area) {
        area.textContent = texto;
        area.style.color = erro ? "#ff9a9a" : "#88c9a5";
    }
}
function traduzErro(erro) {
    const texto = (erro?.message || "").toLowerCase();
    if (texto.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
    if (texto.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
    if (texto.includes("user already registered")) return "Este e-mail já está cadastrado.";
    if (texto.includes("password")) return "A senha não atende aos requisitos configurados no Supabase.";
    if (texto.includes("rate limit") || texto.includes("too many")) return "Muitas tentativas. Aguarde e tente novamente.";
    return erro?.message || "Não foi possível concluir. Tente novamente.";
}
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validarSenha(senha) {
    return senha.length >= 8 && /[a-z]/.test(senha) && /[A-Z]/.test(senha)
        && /[0-9]/.test(senha) && /[^a-zA-Z0-9]/.test(senha);
}
function aguardando(form, estado) {
    const botao = form?.querySelector('button[type="submit"]');
    if (botao) botao.disabled = estado;
}

// 4. BOTÃO MOSTRAR/OCULTAR SENHA.
elemento("toggle-password")?.addEventListener("click", () => {
    const campo = elemento("password");
    const botao = elemento("toggle-password");
    const visivel = campo.type === "password";
    campo.type = visivel ? "text" : "password";
    botao.setAttribute("aria-label", visivel ? "Ocultar senha" : "Mostrar senha");
    botao.setAttribute("aria-pressed", String(visivel));
});

// 5. LOGIN COM E-MAIL E SENHA.
elemento("loginForm")?.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const form = evento.currentTarget;
    const email = elemento("email").value.trim();
    const senha = elemento("password").value;
    if (!validarEmail(email)) return mensagem("Informe um e-mail válido.", true);
    if (!senha) return mensagem("Informe sua senha.", true);
    if (!cliente) return mensagem("Configure a Project URL e a Publishable Key no config.js.", true);
    const lembrar = elemento("remember")?.checked ?? true;
    localStorage.setItem("unievents_lembrar", lembrar ? "sim" : "nao");
    aguardando(form, true);
    try {
        const { error } = await cliente.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        mensagem("Login realizado com sucesso! A página Home será conectada na próxima etapa.");
    } catch (erro) { mensagem(traduzErro(erro), true); }
    finally { aguardando(form, false); }
});

// 6. CADASTRO DE NOVOS ESTUDANTES.
elemento("cadastroForm")?.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const form = evento.currentTarget;
    const email = elemento("email").value.trim();
    const senha = elemento("password").value;
    const confirmar = elemento("confirm-password").value;
    if (!validarEmail(email)) return mensagem("Informe um e-mail válido.", true);
    if (!validarSenha(senha)) return mensagem("Use 8+ caracteres, com maiúscula, minúscula, número e símbolo.", true);
    if (senha !== confirmar) return mensagem("As senhas não coincidem.", true);
    if (!cliente) return mensagem("Configure o arquivo config.js primeiro.", true);
    aguardando(form, true);
    try {
        const { error } = await cliente.auth.signUp({
            email, password: senha,
            options: { emailRedirectTo: paginaLogin }
        });
        if (error) throw error;
        mensagem("Solicitação recebida! Se o endereço puder ser cadastrado, você receberá um e-mail de confirmação. Confira também o spam.");
    } catch (erro) { mensagem(traduzErro(erro), true); }
    finally { aguardando(form, false); }
});

// 7. SOLICITAÇÃO DE RECUPERAÇÃO DE SENHA.
elemento("recuperacaoForm")?.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const form = evento.currentTarget;
    const email = elemento("email").value.trim();
    if (!validarEmail(email)) return mensagem("Informe um e-mail válido.", true);
    if (!cliente) return mensagem("Configure o arquivo config.js primeiro.", true);
    aguardando(form, true);
    try {
        const { error } = await cliente.auth.resetPasswordForEmail(email, {
            redirectTo: paginaRedefinir
        });
        if (error) throw error;
        mensagem("Se existir uma conta com esse e-mail, enviaremos instruções para redefinir a senha.");
    } catch (erro) { mensagem(traduzErro(erro), true); }
    finally { aguardando(form, false); }
});

// 8. DEFINIÇÃO DA NOVA SENHA APÓS ABRIR O LINK DO E-MAIL.
elemento("redefinicaoForm")?.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const form = evento.currentTarget;
    const senha = elemento("password").value;
    const confirmar = elemento("confirm-password").value;
    if (!validarSenha(senha)) return mensagem("Use 8+ caracteres, com maiúscula, minúscula, número e símbolo.", true);
    if (senha !== confirmar) return mensagem("As senhas não coincidem.", true);
    if (!cliente) return mensagem("Configure o arquivo config.js primeiro.", true);
    aguardando(form, true);
    try {
        const { data: { session } } = await cliente.auth.getSession();
        if (!session) throw new Error("Link inválido ou expirado. Solicite outro e-mail de recuperação.");
        const { error } = await cliente.auth.updateUser({ password: senha });
        if (error) throw error;
        await cliente.auth.signOut();
        mensagem("Senha alterada! Volte ao login e entre com a nova senha.");
    } catch (erro) { mensagem(traduzErro(erro), true); }
    finally { aguardando(form, false); }
});

// 9. NAVEGAÇÃO ENTRE AS TELAS.
elemento("register-link")?.addEventListener("click", (evento) => {
    evento.preventDefault(); window.location.href = "cadastro.html";
});
elemento("forgot-password")?.addEventListener("click", (evento) => {
    evento.preventDefault(); window.location.href = "recuperar.html";
});
elemento("google-login")?.addEventListener("click", () => {
    mensagem("Login com Google ainda não está configurado. Utilize e-mail e senha.", true);
});

if (!cliente) mensagem("Atenção: preencha o arquivo config.js para ativar a autenticação.", true);
