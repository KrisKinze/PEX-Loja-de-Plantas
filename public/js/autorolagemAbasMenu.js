/* ============================================================ */
/* AUTO-ROLAGEM DO MENU DE ABAS */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const abasLinks = document.querySelectorAll('#abasMenu .nav-link');
  const abasMenu = document.getElementById('abasMenu');

  abasLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const currentScrollY = window.scrollY;
      const targetId = link.getAttribute('data-bs-target');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active', 'show');
        });
        
        abasLinks.forEach(l => l.classList.remove('active'));
        
        targetElement.classList.add('active', 'show');
        link.classList.add('active');
        
        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      }
    });
  });
});