document.addEventListener('DOMContentLoaded', () => {
  const abasLinks = document.querySelectorAll('#abasMenu .nav-link');
  const abasConteudo = document.getElementById('abasConteudo');

  abasLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Permite o comportamento padrão para ativar a aba
      const targetId = link.getAttribute('data-bs-target');
      const targetElement = document.querySelector(targetId);

      // Rola suavemente até o topo do contêiner interno
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Ajusta a rolagem para compensar o menu fixo
      const offset = abasConteudo.offsetTop - abasLinks[0].offsetHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
});