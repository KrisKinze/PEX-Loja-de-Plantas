/* ============================================================ */
/* SISTEMA DE FILTROS */
/* ============================================================ */

let tamanhosAtivos = new Set(['Pequena', 'Média', 'Grande']);

function salvarPlantasParaFiltro(plantas) {
    inicializarFiltrosTamanho();
}

function inicializarFiltrosTamanho() {
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    
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
            
            filtrarPorTamanho();
            
            requestAnimationFrame(() => {
                window.scrollTo({ top: scrollAtual, behavior: 'instant' });
            });
        });
    });
}

function filtrarPorTamanho() {
    if (tamanhosAtivos.size === 0) {
        renderizarCatalogo([]);
        return;
    }
    
    const plantasFiltradas = todasPlantas.filter(planta => tamanhosAtivos.has(planta.tamanho));
    const plantasOrdenadas = plantasFiltradas.sort((a, b) => a.valor - b.valor);
    renderizarCatalogo(plantasOrdenadas);
}

function filtrarPorDisponibilidade(disponiveis = true) {
    const plantasFiltradas = todasPlantas.filter(planta => 
        disponiveis ? planta.disponibilidade === 1 : planta.disponibilidade === 0
    );
    renderizarCatalogo(plantasFiltradas);
}

function filtrarPorPreco(precoMin, precoMax) {
    const plantasFiltradas = todasPlantas.filter(planta => {
        const valor = parseFloat(planta.valor);
        return valor >= precoMin && valor <= precoMax;
    });
    renderizarCatalogo(plantasFiltradas);
}

function ordenarPlantas(criterio) {
    let plantasOrdenadas = [...todasPlantas];
    
    switch(criterio) {
        case 'nome-asc': plantasOrdenadas.sort((a, b) => a.nome.localeCompare(b.nome)); break;
        case 'nome-desc': plantasOrdenadas.sort((a, b) => b.nome.localeCompare(a.nome)); break;
        case 'preco-asc': plantasOrdenadas.sort((a, b) => a.valor - b.valor); break;
        case 'preco-desc': plantasOrdenadas.sort((a, b) => b.valor - a.valor); break;
    }
    
    renderizarCatalogo(plantasOrdenadas);
}

function buscarPorNome(termo) {
    const termoLower = termo.toLowerCase();
    const plantasEncontradas = todasPlantas.filter(planta => 
        planta.nome.toLowerCase().includes(termoLower)
    );
    renderizarCatalogo(plantasEncontradas);
}

function resetarFiltros() {
    renderizarCatalogo(todasPlantas);
}