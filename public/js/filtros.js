/* ============================================================ */
/* SISTEMA DE FILTROS                                           */
/* ============================================================ */



/* ============================================================ */
/* ESTADO DOS FILTROS ATIVOS                                    */
/* ============================================================ */

let tamanhosAtivos = new Set(['Pequena', 'Média', 'Grande']);

// true = mostra apenas disponíveis (padrão ativo)
let apenasDisponiveis = true;



/* ============================================================ */
/* INICIALIZAÇÃO — chamada pelo plantas.js após carregar dados  */
/* ============================================================ */

function salvarPlantasParaFiltro(plantas) {
    inicializarFiltrosTamanho();
    inicializarFiltroDisponibilidade();
}



/* ============================================================ */
/* FILTROS DE TAMANHO                                           */
/* ============================================================ */

function inicializarFiltrosTamanho() {
    const botoesFiltro = document.querySelectorAll('.filtro-btn[data-tamanho]');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollAtual = window.scrollY;
            const tamanho = this.getAttribute('data-tamanho');

            this.classList.toggle('ativo');

            if (this.classList.contains('ativo')) {
                tamanhosAtivos.add(tamanho);
            } else {
                tamanhosAtivos.delete(tamanho);
            }

            aplicarFiltrosCombinados();

            requestAnimationFrame(() => {
                window.scrollTo({ top: scrollAtual, behavior: 'instant' });
            });
        });
    });
}



/* ============================================================ */
/* FILTRO DE DISPONIBILIDADE                                    */
/* ============================================================ */

function inicializarFiltroDisponibilidade() {
    const btn = document.getElementById('btn-apenas-disponiveis');
    if (!btn) return;

    btn.classList.toggle('ativo', apenasDisponiveis);

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const scrollAtual = window.scrollY;

        apenasDisponiveis = !apenasDisponiveis;
        this.classList.toggle('ativo', apenasDisponiveis);

        aplicarFiltrosCombinados();

        requestAnimationFrame(() => {
            window.scrollTo({ top: scrollAtual, behavior: 'instant' });
        });
    });
}



/* ============================================================ */
/* FILTRO COMBINADO (tamanho + disponibilidade)                 */
/* ============================================================ */

function aplicarFiltrosCombinados() {
    let resultado = [...todasPlantas];

    // Aplica filtro de tamanho — se nenhum ativo, mostra nenhuma
    if (tamanhosAtivos.size === 0) {
        renderizarCatalogo([]);
        return;
    }
    resultado = resultado.filter(planta => tamanhosAtivos.has(planta.tamanho));

    // Aplica filtro de disponibilidade — só filtra se o botão estiver ativo
    if (apenasDisponiveis) {
        resultado = resultado.filter(planta => planta.disponivel !== 0 && planta.disponivel !== null);    
    }

    resultado.sort((a, b) => a.preco - b.preco);
    renderizarCatalogo(resultado);
}



/* ============================================================ */
/* ORDENAÇÃO                                                    */
/* ============================================================ */

function ordenarPlantas(criterio) {
    let plantasOrdenadas = [...todasPlantas];

    switch (criterio) {
        case 'nome-asc':   plantasOrdenadas.sort((a, b) => a.nome.localeCompare(b.nome)); break;
        case 'nome-desc':  plantasOrdenadas.sort((a, b) => b.nome.localeCompare(a.nome)); break;
        case 'preco-asc':  plantasOrdenadas.sort((a, b) => a.preco - b.preco); break;
        case 'preco-desc': plantasOrdenadas.sort((a, b) => b.preco - a.preco); break;
    }

    renderizarCatalogo(plantasOrdenadas);
}



/* ============================================================ */
/* BUSCA POR NOME                                               */
/* ============================================================ */

function buscarPorNome(termo) {
    const termoLower = termo.toLowerCase();
    const plantasEncontradas = todasPlantas.filter(planta =>
        planta.nome.toLowerCase().includes(termoLower)
    );
    renderizarCatalogo(plantasEncontradas);
}



/* ============================================================ */
/* RESET GERAL                                                  */
/* ============================================================ */

function resetarFiltros() {
    renderizarCatalogo(todasPlantas);
}