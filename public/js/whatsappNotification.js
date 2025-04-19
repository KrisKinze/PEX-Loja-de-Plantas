document.addEventListener("DOMContentLoaded", () => {
  // Seleciona TODOS os elementos com a classe 'whatsapp-notification-trigger'
  const whatsappLinks = document.querySelectorAll(
    ".whatsapp-notification-trigger"
  );
  const toastContainer = document.getElementById("toast-container"); // Contêiner para os toasts

  if (whatsappLinks.length > 0 && toastContainer) {
    // Adiciona o listener para CADA link encontrado
    whatsappLinks.forEach((whatsappLink) => {
      whatsappLink.addEventListener("click", (event) => {
        event.preventDefault(); // Impede a navegação padrão do link

        // Cria e exibe a notificação
        const toast = document.createElement("div");
        toast.className = "toast"; // Usa a mesma classe CSS das outras notificações
        toast.textContent =
          "Não temos WhatsApp por enquanto, pedimos desculpas pelo inconveniente.";
        toastContainer.appendChild(toast);

        // Remove a notificação após 4 segundos (mesmo tempo das outras)
        setTimeout(() => {
          toast.remove();
        }, 4000);
      });
    });
  } else {
    if (whatsappLinks.length === 0)
      console.error(
        'Nenhum link do WhatsApp com a classe "whatsapp-notification-trigger" encontrado.'
      );
    if (!toastContainer)
      console.error("Contêiner de notificações não encontrado.");
  }
});
