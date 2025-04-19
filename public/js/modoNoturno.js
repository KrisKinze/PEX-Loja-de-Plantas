document.addEventListener('DOMContentLoaded', () => {
    const toggleModoNoturno = document.getElementById('toggle-modo-noturno');
    const body = document.body;

    // Verifica se o modo noturno está ativado no armazenamento local
    const modoNoturnoAtivo = localStorage.getItem('modoNoturno') === 'true';

    if (modoNoturnoAtivo) {
        body.classList.add('modo-noturno');
        toggleModoNoturno.querySelector('sl-icon').name = 'sun'; // Altera o ícone para "sol"
    }

    toggleModoNoturno.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link

        body.classList.toggle('modo-noturno');

        // Salva o estado do modo noturno no armazenamento local
        const modoAtivo = body.classList.contains('modo-noturno');
        localStorage.setItem('modoNoturno', modoAtivo);

        // Alterna o ícone
        const icon = toggleModoNoturno.querySelector('sl-icon');
        icon.name = modoAtivo ? 'sun' : 'moon';

        // Força a atualização do background-image
        if (modoAtivo) {
            body.style.backgroundImage = 'url("/images/Background/MODO ESCURO MAIOR.svg")';
        } else {
            body.style.backgroundImage = 'url("/images/Background/MODO CLARO MAIOR.svg")';
        }
    });
});