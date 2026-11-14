
/* ==========================================
   UNIEVENTS — INTERAÇÕES DA NOVA HOME

   Funcionalidades:
   1. Carrossel de eventos em destaque
   2. Navegação por setas
   3. Indicadores de posição
   4. Navegação por toque no celular
   5. Ajuste automático ao tamanho da tela

   Este arquivo NÃO modifica o Supabase,
   os filtros nem o sistema de favoritos.
========================================== */

(function () {

    "use strict";

    // ======================================
    // 1. ELEMENTOS DO CARROSSEL
    // ======================================

    const carrossel = document.getElementById(
        "destaques"
    );

    const anterior = document.getElementById(
        "carrossel-anterior"
    );

    const proximo = document.getElementById(
        "carrossel-proximo"
    );

    const indicadores = document.getElementById(
        "carrossel-indicadores"
    );

    if (
        !carrossel ||
        !anterior ||
        !proximo ||
        !indicadores
    ) {
        return;
    }

    let indiceAtual = 0;
    let quantidadeVisivel = 3;
    let totalEventos = 0;

    let observador = null;


    // ======================================
    // 2. CONSULTAR CARDS
    // ======================================

    function obterCards() {

        return Array.from(
            carrossel.querySelectorAll(
                ":scope > .card"
            )
        );
    }


    // ======================================
    // 3. EVENTOS VISÍVEIS POR TELA
    // ======================================

    function calcularQuantidadeVisivel() {

        const largura = window.innerWidth;

        if (largura <= 700) {
            return 1;
        }

        if (largura <= 1000) {
            return 2;
        }

        return 3;
    }


    // ======================================
    // 4. ÍNDICE MÁXIMO
    // ======================================

    function indiceMaximo() {

        return Math.max(
            0,
            totalEventos - quantidadeVisivel
        );
    }


    // ======================================
    // 5. ATUALIZAR SETAS
    // ======================================

    function atualizarSetas() {

        anterior.disabled = indiceAtual <= 0;

        proximo.disabled =
            indiceAtual >= indiceMaximo();
    }


    // ======================================
    // 6. ATUALIZAR INDICADORES
    // ======================================

    function atualizarIndicadores() {

        const botoes = indicadores.querySelectorAll(
            "button"
        );

        botoes.forEach((botao, indice) => {

            const ativo = indice === indiceAtual;

            botao.classList.toggle(
                "ativo",
                ativo
            );

            botao.setAttribute(
                "aria-current",
                ativo ? "true" : "false"
            );
        });
    }


    // ======================================
    // 7. POSICIONAR CARROSSEL
    // ======================================

    function irPara(indice, suave = true) {

        const cards = obterCards();

        if (!cards.length) {
            return;
        }

        indiceAtual = Math.max(
            0,
            Math.min(indice, indiceMaximo())
        );

        const card = cards[indiceAtual];

        if (!card) {
            return;
        }

        const posicao = card.offsetLeft -
            cards[0].offsetLeft;

        const reduzirMovimento = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        carrossel.scrollTo({
            left: posicao,
            behavior: suave && !reduzirMovimento
                ? "smooth"
                : "instant"
        });

        atualizarSetas();
        atualizarIndicadores();
    }


    // ======================================
    // 8. CRIAR INDICADORES
    // ======================================

    function criarIndicadores() {

        indicadores.innerHTML = "";

        const quantidade = indiceMaximo() + 1;

        for (let i = 0; i < quantidade; i++) {

            const botao = document.createElement(
                "button"
            );

            botao.type = "button";

            botao.setAttribute(
                "aria-label",
                `Ir para a posição ${i + 1}`
            );

            botao.addEventListener(
                "click",
                () => irPara(i)
            );

            indicadores.appendChild(botao);
        }

        atualizarIndicadores();
    }


    // ======================================
    // 9. CONFIGURAR CARROSSEL
    // ======================================

    function configurarCarrossel() {

        const cards = obterCards();

        totalEventos = cards.length;

        quantidadeVisivel =
            calcularQuantidadeVisivel();

        indiceAtual = Math.min(
            indiceAtual,
            indiceMaximo()
        );

        const existeNavegacao =
            totalEventos > quantidadeVisivel;

        anterior.hidden = !existeNavegacao;
        proximo.hidden = !existeNavegacao;

        indicadores.hidden = !existeNavegacao;

        criarIndicadores();

        if (totalEventos > 0) {
            irPara(indiceAtual, false);
        }

        atualizarSetas();
    }


    // ======================================
    // 10. NAVEGAÇÃO PELAS SETAS
    // ======================================

    anterior.addEventListener(
        "click",
        () => {

            irPara(indiceAtual - 1);
        }
    );

    proximo.addEventListener(
        "click",
        () => {

            irPara(indiceAtual + 1);
        }
    );


    // ======================================
    // 11. SINCRONIZAR AO ARRASTAR
    // ======================================

    let aguardandoScroll = false;

    carrossel.addEventListener(
        "scroll",
        () => {

            if (aguardandoScroll) {
                return;
            }

            aguardandoScroll = true;

            requestAnimationFrame(() => {

                aguardandoScroll = false;

                const cards = obterCards();

                if (!cards.length) {
                    return;
                }

                const primeiro = cards[0];

                const larguraPasso =
                    cards.length > 1
                        ? cards[1].offsetLeft -
                        primeiro.offsetLeft
                        : primeiro.offsetWidth;

                if (larguraPasso <= 0) {
                    return;
                }

                const novoIndice = Math.round(
                    carrossel.scrollLeft /
                    larguraPasso
                );

                indiceAtual = Math.max(
                    0,
                    Math.min(
                        novoIndice,
                        indiceMaximo()
                    )
                );

                atualizarSetas();
                atualizarIndicadores();

            });
        },
        { passive: true }
    );


    // ======================================
    // 12. AJUSTAR À TELA
    // ======================================

    let ultimaQuantidade =
        calcularQuantidadeVisivel();

    window.addEventListener(
        "resize",
        () => {

            const novaQuantidade =
                calcularQuantidadeVisivel();

            if (
                novaQuantidade !== ultimaQuantidade
            ) {

                ultimaQuantidade = novaQuantidade;

                configurarCarrossel();
            }
        }
    );


    // ======================================
    // 13. OBSERVAR EVENTOS CARREGADOS
    // ======================================

    // O script.js busca a sessão Supabase
    // antes de renderizar os eventos.
    //
    // Por isso, observamos quando os cards
    // aparecem ou são atualizados.

    observador = new MutationObserver(() => {

        const quantidadeAtual =
            obterCards().length;

        if (
            quantidadeAtual !== totalEventos
        ) {

            configurarCarrossel();
        }
    });

    observador.observe(carrossel, {
        childList: true
    });


    // ======================================
    // 14. INICIALIZAÇÃO
    // ======================================

    configurarCarrossel();

})();
