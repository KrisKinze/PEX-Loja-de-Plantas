/* ============================================================ */
/* SINCRONIZAÇÃO DAS ABAS EM TODOS OS MENUS */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const todosOsBotoesAbas = document.querySelectorAll('.abas-alca .nav-link');

  todosOsBotoesAbas.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = botao.getAttribute('data-bs-target');
      const targetPane = document.querySelector(targetId);

      if (targetPane) {
        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active', 'show');
        });

        document.querySelectorAll('.abas-alca .nav-link').forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });

        targetPane.classList.add('active', 'show');

        const abaNumber = targetId.replace('#aba', '');
        document.querySelectorAll(`[data-bs-target="${targetId}"]`).forEach(btn => {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        });

        targetPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
