/* ============================================================ */
/* NAVEGAÇÃO PARA CONTATO */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const linkContato = document.getElementById('link-contato');
    const abaContatoTab = document.getElementById('aba3-tab');
    const abaContatoContent = document.getElementById('aba3');

    linkContato.addEventListener('click', (e) => {
        e.preventDefault();

        if (abaContatoTab) {
            abaContatoTab.click();
        }

        if (abaContatoContent) {
            abaContatoContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});