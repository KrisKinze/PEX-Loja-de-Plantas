// Seleciona os botões do menu e as seções de catálogo
const botoesCategoria = document.querySelectorAll('.menu-item');
const catalogos = document.querySelectorAll('.catalogo-grid');

// Adiciona evento de clique a cada botão
botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {
        const categoria = botao.getAttribute('data-categoria');

        // Oculta todos os catálogos
        catalogos.forEach(catalogo => {
            catalogo.style.display = 'none';
        });

        // Exibe o catálogo correspondente à categoria clicada
        const catalogoSelecionado = document.getElementById(categoria);
        if (catalogoSelecionado) {
            catalogoSelecionado.style.display = 'grid';
        }
    });
});