/* ============================================================ */
/* API E CONFIGURAÇÃO */
/* ============================================================ */

import { supabase } from './supabase.js'

let todasPlantas = [];

async function buscarPlantas() {
    try {
        const { data, error } = await supabase
            .from('plantas')
            .select('*')

        if (error) throw error
        return data

    } catch (error) {
        console.error('Erro ao buscar plantas:', error)
        return []
    }
}

/* ============================================================ */
/* RENDERIZAÇÃO DO CATÁLOGO */
/* ============================================================ */

function renderizarCatalogo(plantas) {

    const catalogoContainer = document.getElementById('catalogosDePlantas');
    
    if (!catalogoContainer) return;
    
    catalogoContainer.innerHTML = '';
    
    if (plantas.length === 0) {
        catalogoContainer.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 1.2rem; color: #666;">Nenhuma planta encontrada com os filtros selecionados.</p>';
        return;
    }
    
        plantas.forEach(planta => {
        const qtdDisponivel = Number(planta.disponivel) || 0;
        const qtdReservada = Number(planta.reservada) || 0;

        const badgeDisponivel = qtdDisponivel > 0
            ? `<span class="badge-planta badge-disponivel">🌿 Disponível: ${qtdDisponivel}</span>`
            : `<span class="badge-planta badge-indisponivel">❌ Indisponível</span>`;

        const badgeReservado = qtdReservada > 0
            ? `<span class="badge-planta badge-reservado">📦 Reservado: ${qtdReservada}</span>`
            : '';

        const plantaCard = `
            <div class="planta-card">
                <img src="${planta.imagem_url}" alt="${planta.nome}" class="planta-img">
                <span class="planta-tamanho">${planta.tamanho}</span>
                <div class="planta-info">
                    <h3 class="planta-nome">${planta.nome}</h3>
                    <div class="planta-badges">
                        ${badgeDisponivel}
                        ${badgeReservado}
                    </div>
                    <p class="planta-valor">R$ ${planta.preco.toFixed(2)}</p>
                    <div class="planta-actions">
                        <button class="btn-comprar" onclick="adicionarAoCarrinho('${planta.id}')">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
        catalogoContainer.innerHTML += plantaCard;
    });
}

/* ============================================================ */
/* CARRINHO DE COMPRAS */
/* ============================================================ */

function adicionarAoCarrinho(plantaId) {
    const planta = todasPlantas.find(p => String(p.id) === String(plantaId));
    if (!planta) return;
    
    const mensagemCarrinho = document.getElementById('mensagem-carrinho');
    if (mensagemCarrinho) {
        const itemCarrinho = `\n- ${planta.nome} (${planta.tamanho}) - R$ ${planta.preco.toFixed(2)}`;
        mensagemCarrinho.value += itemCarrinho;
    }
    
    mostrarNotificacaoCarrinho(planta.nome);
}

function mostrarNotificacaoCarrinho(nomePlanta) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-carrinho';
    toast.innerHTML = `
        <strong>✓ Planta adicionada!</strong><br>
        <span>${nomePlanta}</span><br>
        <small>Por favor, verifique a aba de Contatos</small>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.5s ease-out forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

/* ============================================================ */
/* INICIALIZAÇÃO */
/* ============================================================ */

async function inicializarCatalogo() {
    const plantas = await buscarPlantas();
    
    if (plantas.length > 0) {
        const plantasOrdenadas = plantas.sort((a, b) => a.preco - b.preco);
        todasPlantas = plantasOrdenadas;

        window.todasPlantas = plantasOrdenadas;         // libera para filtros.js
        window.adicionarAoCarrinho = adicionarAoCarrinho; // libera para o onclick do HTML
        window.renderizarCatalogo = renderizarCatalogo;   // (NOVO) libera para filtros.js renderizar após filtrar

        renderizarCatalogo(plantasOrdenadas);
        
        if (typeof salvarPlantasParaFiltro === 'function') {
            salvarPlantasParaFiltro(plantasOrdenadas);
        }
        
        inicializarCarrossel();
    } else {
        const catalogoContainer = document.getElementById('catalogosDePlantas');
        if (catalogoContainer) {
            catalogoContainer.innerHTML = '<p>Erro ao carregar plantas. Tente novamente.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', inicializarCatalogo);

/* ============================================================ */
/* CARROSSEL */
/* ============================================================ */

function inicializarCarrossel() {
    const catalogoContainer = document.getElementById('catalogosDePlantas');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (!catalogoContainer || !btnPrev || !btnNext) return;
    
    function getScrollAmount() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) return catalogoContainer.offsetWidth;
        if (screenWidth <= 771) return catalogoContainer.offsetWidth / 2;
        return 300;
    }
    
    btnPrev.addEventListener('click', () => {
        catalogoContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
    
    btnNext.addEventListener('click', () => {
        catalogoContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
    
    let isDown = false, startX, scrollLeft;
    
    catalogoContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        catalogoContainer.style.cursor = 'grabbing';
        startX = e.pageX - catalogoContainer.offsetLeft;
        scrollLeft = catalogoContainer.scrollLeft;
    });
    
    catalogoContainer.addEventListener('mouseleave', () => {
        isDown = false;
        catalogoContainer.style.cursor = 'grab';
    });
    
    catalogoContainer.addEventListener('mouseup', () => {
        isDown = false;
        catalogoContainer.style.cursor = 'grab';
    });
    
    catalogoContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - catalogoContainer.offsetLeft;
        const walk = (x - startX) * 2;
        catalogoContainer.scrollLeft = scrollLeft - walk;
    });
    
    catalogoContainer.style.cursor = 'grab';
}