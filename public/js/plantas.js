// URL da API - usar Render em produção, localhost em desenvolvimento
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://jardim-vital-backend-qxd7.onrender.com';

// Função para buscar plantas da API
async function buscarPlantas() {
    try {
        const response = await fetch(`${API_URL}/api/plantas`);
        const plantas = await response.json();
        
        if (response.ok) {
            console.log('✅ Plantas carregadas:', plantas);
            return plantas;
        } else {
            throw new Error('Erro ao buscar plantas');
        }
    } catch (error) {
        console.error('❌ Erro ao buscar plantas:', error);
        return [];
    }
}

// Função para renderizar plantas no catálogo
function renderizarCatalogo(plantas) {
    const catalogoContainer = document.getElementById('catalogosDePlantas');
    
    if (!catalogoContainer) {
        console.error('Container do catálogo não encontrado!');
        return;
    }
    
    // Limpar conteúdo atual
    catalogoContainer.innerHTML = '';
    
    // Criar HTML para cada planta
    plantas.forEach(planta => {
        const plantaCard = `
            <div class="planta-card">
                <img src="${planta.imagem}" alt="${planta.nome}" class="planta-img">
                <div class="planta-info">
                    <h3 class="planta-nome">${planta.nome}</h3>
                    <p class="planta-valor">R$ ${planta.valor.toFixed(2)}</p>
                    <div class="planta-actions">
                        <button class="btn-comprar" onclick="adicionarAoCarrinho(${planta.id})">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        catalogoContainer.innerHTML += plantaCard;
    });
}

// Função para adicionar ao carrinho (placeholder por enquanto)
function adicionarAoCarrinho(plantaId) {
    console.log(`Planta ${plantaId} adicionada ao carrinho!`);
    // Aqui você pode implementar a lógica do carrinho depois
    alert(`Planta adicionada ao carrinho! (ID: ${plantaId})`);
}

// Função principal que executa quando a página carrega
async function inicializarCatalogo() {
    console.log('🌱 Carregando catálogo de plantas...');
    
    const plantas = await buscarPlantas();
    
    if (plantas.length > 0) {
        renderizarCatalogo(plantas);
        console.log('✅ Catálogo renderizado com sucesso!');
    } else {
        console.log('⚠️ Nenhuma planta encontrada');
        // Mostrar mensagem de erro na tela
        const catalogoContainer = document.getElementById('catalogosDePlantas');
        if (catalogoContainer) {
            catalogoContainer.innerHTML = '<p>Erro ao carregar plantas. Tente novamente.</p>';
        }
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarCatalogo);