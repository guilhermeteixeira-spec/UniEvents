
/* ========================================
   UNIEVENTS — INTERAÇÕES DO LOGIN
   Controla os campos, botões e mensagens
   da tela de login.
======================================== */


/* ========================================
   1. ELEMENTOS DO HTML
   Busca os elementos da página pelos IDs
   para que o JavaScript possa utilizá-los.
======================================== */

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");

const forgotPassword = document.getElementById("forgot-password");
const registerLink = document.getElementById("register-link");
const togglePassword = document.getElementById("toggle-password");
const googleLogin = document.getElementById("google-login");


/* ========================================
   2. EXIBIÇÃO DE MENSAGENS
   Mostra avisos abaixo do botão de login.
   A cor padrão é azul, mas pode ser
   alterada para vermelho em caso de erro.
======================================== */

function showMessage(message, color = "#78a8ff") {
    loginMessage.textContent = message;
    loginMessage.style.color = color;
}


/* ========================================
   3. MOSTRAR E OCULTAR SENHA
   Alterna o campo entre texto visível
   e senha escondida ao clicar no ícone.
======================================== */

togglePassword.addEventListener("click", function () {

    const showingPassword = passwordInput.type === "password";

    passwordInput.type = showingPassword ? "text" : "password";

    // Atualiza a descrição do botão.
    togglePassword.setAttribute(
        "aria-label",
        showingPassword ? "Ocultar senha" : "Mostrar senha"
    );

    // Informa se a senha está visível.
    togglePassword.setAttribute(
        "aria-pressed",
        String(showingPassword)
    );
});


/* ========================================
   4. VALIDAÇÃO DO FORMULÁRIO
   Verifica se os dados foram preenchidos
   corretamente antes de permitir o login.
======================================== */

loginForm.addEventListener("submit", function (event) {

    // Impede que a página recarregue.
    event.preventDefault();

    // Obtém os valores digitados.
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Verifica se o e-mail está vazio.
    if (!email) {
        showMessage(
            "Por favor, informe seu e-mail.",
            "#ff8f8f"
        );

        emailInput.focus();
        return;
    }

    // Verifica se o formato do e-mail é válido.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage(
            "Por favor, informe um endereço de e-mail válido.",
            "#ff8f8f"
        );

        emailInput.focus();
        return;
    }

    // Verifica se a senha está vazia.
    if (!password) {
        showMessage(
            "Por favor, informe sua senha.",
            "#ff8f8f"
        );

        passwordInput.focus();
        return;
    }

    // Exige pelo menos seis caracteres.
    if (password.length < 6) {
        showMessage(
            "A senha deve ter pelo menos 6 caracteres.",
            "#ff8f8f"
        );

        passwordInput.focus();
        return;
    }

    // Os dados passaram pela validação básica.
    // A autenticação real será integrada depois.
    showMessage(
        "Dados validados! A autenticação ainda precisa ser configurada."
    );
});


/* ========================================
   5. RECUPERAÇÃO DE SENHA
   Exibe um aviso enquanto a funcionalidade
   ainda não está conectada ao Supabase.
======================================== */

forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    showMessage(
        "A recuperação de senha estará disponível após a integração com o Supabase."
    );
});


/* ========================================
   6. CADASTRO DE USUÁRIOS
   Informa que a tela de cadastro ainda
   será desenvolvida.
======================================== */

registerLink.addEventListener("click", function (event) {

    event.preventDefault();

    showMessage(
        "A tela de cadastro será desenvolvida na próxima etapa."
    );
});


/* ========================================
   7. LOGIN COM GOOGLE
   Exibe uma mensagem informando que
   a autenticação Google ainda não está
   configurada.
======================================== */

googleLogin.addEventListener("click", function () {

    showMessage(
        "O login com Google estará disponível após a configuração da autenticação."
    );
});
