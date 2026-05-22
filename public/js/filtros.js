/* ============================================================ */
/* SISTEMA DE FILTROS — versão com selects + busca             */
/* ============================================================ */

function salvarPlantasParaFiltro(plantas) {
    inicializarFiltros();
}

function inicializarFiltros() {
    const busca     = document.getElementById('busca-planta');
    const tamanho   = document.getElementById('filtro-tamanho');
    const disp      = document.getElementById('filtro-disponibilidade');
    const ordem     = document.getElementById('filtro-ordem');
    const btnLimpar = document.getElementById('btn-limpar-filtros');

    if (!busca && !tamanho && !disp && !ordem) return;

    // Dispara filtro ao interagir com qualquer campo
    [busca, tamanho, disp, ordem].forEach(el => {
        if (!el) return;
        el.addEventListener('input', aplicarFiltrosCombinados);
        el.addEventListener('change', aplicarFiltrosCombinados);
    });

    btnLimpar?.addEventListener('click', function (e) {
        e.preventDefault();
        if (busca)   busca.value   = '';
        if (tamanho) tamanho.value = '';
        if (disp)    disp.value    = '';
        if (ordem)   ordem.value   = 'preco-asc';
        aplicarFiltrosCombinados();
    });

    // Aplica filtros iniciais respeitando o select "Disponíveis" pré-selecionado
    aplicarFiltrosCombinados();
}

/* ============================================================ */
/* FILTRO COMBINADO                                             */
/* ============================================================ */

function aplicarFiltrosCombinados() {
    const termoBusca = document.getElementById('busca-planta')?.value.toLowerCase().trim() || '';
    const tamanhoVal = document.getElementById('filtro-tamanho')?.value || '';
    const dispVal    = document.getElementById('filtro-disponibilidade')?.value || '';
    const ordemVal   = document.getElementById('filtro-ordem')?.value || 'preco-asc';

    let resultado = [...todasPlantas];

    // Busca por nome
    if (termoBusca) {
        resultado = resultado.filter(p =>
            p.nome.toLowerCase().includes(termoBusca)
        );
    }

    // Tamanho
    if (tamanhoVal) {
        resultado = resultado.filter(p => p.tamanho === tamanhoVal);
    }

    // Disponibilidade
    if (dispVal === 'disponivel') {
        resultado = resultado.filter(p => Number(p.disponivel) > 0);
    } else if (dispVal === 'indisponivel') {
        resultado = resultado.filter(p => Number(p.disponivel) === 0);
    }

    // Ordenação
    switch (ordemVal) {
        case 'preco-asc':  resultado.sort((a, b) => Number(a.preco || 0) - Number(b.preco || 0)); break;
        case 'preco-desc': resultado.sort((a, b) => Number(b.preco || 0) - Number(a.preco || 0)); break;
        case 'nome-asc':   resultado.sort((a, b) => (a.nome || '').localeCompare(b.nome || '')); break;
        case 'nome-desc':  resultado.sort((a, b) => (b.nome || '').localeCompare(a.nome || '')); break;
    }

    renderizarCatalogo(resultado);
}

/* Mantidas por compatibilidade com chamadas externas */
function ordenarPlantas(criterio) {
    const ordemSelect = document.getElementById('filtro-ordem');
    if (ordemSelect) ordemSelect.value = criterio;
    aplicarFiltrosCombinados();
}

function buscarPorNome(termo) {
    const buscaInput = document.getElementById('busca-planta');
    if (buscaInput) buscaInput.value = termo;
    aplicarFiltrosCombinados();
}

function resetarFiltros() {
    renderizarCatalogo(todasPlantas);
}