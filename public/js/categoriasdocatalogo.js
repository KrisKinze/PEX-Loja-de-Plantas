/* ============================================================ */
/* CATEGORIAS DO CATÁLOGO */
/* ============================================================ */

const botoesCategoria = document.querySelectorAll('.menu-item');
const catalogos = document.querySelectorAll('.catalogo-grid');

botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {
        const categoria = botao.getAttribute('data-categoria');

        catalogos.forEach(catalogo => {
            catalogo.style.display = 'none';
        });

        const catalogoSelecionado = document.getElementById(categoria);
        if (catalogoSelecionado) {
            catalogoSelecionado.style.display = 'grid';
        }
    });
});