document.addEventListener('DOMContentLoaded', () => {
    const linkContato = document.getElementById('link-contato');
    const abaContatoTab = document.getElementById('aba3-tab'); // Botão da aba de contato
    const abaContatoContent = document.getElementById('aba3'); // Conteúdo da aba de contato

    linkContato.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link

        // Ativa a aba de contato
        if (abaContatoTab) {
            abaContatoTab.click(); // Simula o clique na aba de contato
        }

        // Rola suavemente até a seção de contato
        if (abaContatoContent) {
            abaContatoContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});