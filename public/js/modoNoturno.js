/* ============================================================ */
/* MODO NOTURNO */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-modo-noturno');
    const body = document.body;
    const icon = toggleButton.querySelector('sl-icon');

    const aplicarModo = (modoAtivo) => {
        if (modoAtivo) {
            body.classList.add('modo-noturno');
            icon.setAttribute('name', 'brightness-high-fill');
        } else {
            body.classList.remove('modo-noturno');
            icon.setAttribute('name', 'moon-stars-fill');
        }
    };

    let modoNoturnoAtivo = localStorage.getItem('modoNoturno') === 'true';
    aplicarModo(modoNoturnoAtivo);

    toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        modoNoturnoAtivo = !modoNoturnoAtivo;
        aplicarModo(modoNoturnoAtivo);
        localStorage.setItem('modoNoturno', modoNoturnoAtivo);
    });
});