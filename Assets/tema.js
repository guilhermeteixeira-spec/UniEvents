
/* ==========================================
   UNIEVENTS — GERENCIADOR GLOBAL DE TEMAS
   ========================================== */

(() => {
    "use strict";

    const CHAVE_TEMA = "unievents-tema";

    function obterTemaSalvo() {
        try {
            return localStorage.getItem(CHAVE_TEMA) === "claro"
                ? "claro"
                : "escuro";
        } catch {
            return "escuro";
        }
    }

    function aplicarTema(tema) {
        document.documentElement.dataset.tema = tema;
        document.documentElement.style.colorScheme =
            tema === "claro" ? "light" : "dark";

        try {
            localStorage.setItem(CHAVE_TEMA, tema);
        } catch {
            // O tema continua funcionando nesta página.
        }

        atualizarBotao(tema);
    }

    function atualizarBotao(tema) {
        const botao = document.getElementById("botao-tema");
        if (!botao) return;

        const escuro = tema === "escuro";

        botao.textContent = escuro ? "☀" : "☾";

        botao.setAttribute(
            "aria-label",
            escuro ? "Ativar modo claro" : "Ativar modo escuro"
        );

        botao.title = escuro
            ? "Ativar modo claro"
            : "Ativar modo escuro";
    }

    function criarBotao() {
        if (document.getElementById("botao-tema")) return;

        const botao = document.createElement("button");

        botao.id = "botao-tema";
        botao.className = "botao-tema-flutuante";
        botao.type = "button";

        botao.addEventListener("click", () => {
            const temaAtual =
                document.documentElement.dataset.tema;

            aplicarTema(
                temaAtual === "escuro" ? "claro" : "escuro"
            );
        });

        document.body.appendChild(botao);

        atualizarBotao(
            document.documentElement.dataset.tema || "escuro"
        );
    }

    // Aplica a preferência assim que o script é carregado.
    document.documentElement.dataset.tema = obterTemaSalvo();
    document.documentElement.style.colorScheme =
        document.documentElement.dataset.tema === "claro"
            ? "light"
            : "dark";

    // Cria o botão quando a estrutura HTML estiver pronta.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", criarBotao);
    } else {
        criarBotao();
    }
})();
