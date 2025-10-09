/* ============================================================ */
/* NOTIFICAÇÃO WHATSAPP */
/* ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const whatsappLinks = document.querySelectorAll(".whatsapp-notification-trigger");
  const toastContainer = document.getElementById("toast-container");

  if (whatsappLinks.length > 0 && toastContainer) {
    whatsappLinks.forEach((whatsappLink) => {
      whatsappLink.addEventListener("click", (event) => {
        event.preventDefault();

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = "Não temos WhatsApp por enquanto, pedimos desculpas pelo inconveniente.";
        toastContainer.appendChild(toast);

        setTimeout(() => {
          toast.remove();
        }, 4000);
      });
    });
  }
});
