document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-modo-noturno');
    const body = document.body;
    const icon = toggleButton.querySelector('sl-icon'); // Seleciona o ícone dentro do botão

    // Função para aplicar o modo baseado no estado salvo e atualizar ícone
    const aplicarModo = (modoAtivo) => {
        if (modoAtivo) {
            body.classList.add('modo-noturno');
            icon.setAttribute('name', 'brightness-high-fill'); // Ícone de sol para desativar
        } else {
            body.classList.remove('modo-noturno');
            icon.setAttribute('name', 'moon-stars-fill'); // Ícone de lua para ativar
        }
    };

    // Verifica o modo salvo no localStorage ao carregar a página
    let modoNoturnoAtivo = localStorage.getItem('modoNoturno') === 'true';
    aplicarModo(modoNoturnoAtivo);

    // Adiciona o evento de clique ao botão
    toggleButton.addEventListener('click', (event) => {
        event.preventDefault(); // Previne qualquer comportamento padrão do link/botão

        // Inverte o estado atual
        modoNoturnoAtivo = !modoNoturnoAtivo;

        // Aplica o novo modo
        aplicarModo(modoNoturnoAtivo);

        // Salva a preferência no localStorage
        localStorage.setItem('modoNoturno', modoNoturnoAtivo);
    });
});