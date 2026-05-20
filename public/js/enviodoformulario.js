/* ============================================================ */
/* FORMULÁRIO DE CONTATO E ENVIO DE EMAIL */
/* ============================================================ */

// NOTA DE SEGURANÇA (Boas Práticas):
// Em um ambiente de produção real, as chaves abaixo
// deveriam ser protegidas via variáveis de ambiente (.env)
// e nunca expostas no código-fonte público.
// Para este projeto acadêmico (PEX), utilizamos o método
// simplificado permitido pelo EmailJS para frontend.
// ======================================================
const EMAILJS_PUBLIC_KEY  = 'JlAKq3PuykM_Heuzl';
const EMAILJS_SERVICE_ID  = 'service_ykvwu4f';
const EMAILJS_TEMPLATE_ID = 'template_fszmgzo';

emailjs.init(EMAILJS_PUBLIC_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const form                = document.getElementById('form-contato');
    const mensagemCarrinho    = document.getElementById('mensagem-carrinho');
    const toastContainer      = document.getElementById('toast-container');
    const botaoEnviar         = document.getElementById('botao-enviar');
    const botaoResetarCarrinho = document.getElementById('resetar-carrinho');

    /* ----- Resetar carrinho ----- */
    if (botaoResetarCarrinho && mensagemCarrinho) {
        botaoResetarCarrinho.addEventListener('click', () => {
            if (mensagemCarrinho.value.trim() === '') {
                mostrarToast(toastContainer, 'O carrinho já está vazio!');
                return;
            }

            mensagemCarrinho.value = '';
            mostrarToast(toastContainer, '🗑️ Carrinho resetado com sucesso!', 'toast-carrinho');
        });
    }

    /* ----- Envio do formulário ----- */
    if (form && mensagemCarrinho && toastContainer && botaoEnviar) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            botaoEnviar.disabled = true;
            botaoEnviar.textContent = 'Enviando...';

            const templateParams = {
                nome:      document.getElementById('nome').value,
                email:     document.getElementById('email').value,
                mensagem:  document.getElementById('mensagem').value,
                carrinho:  mensagemCarrinho.value.trim() || 'Nenhum item adicionado'
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    mostrarToast(toastContainer, 'E-mail enviado com sucesso! Verifique sua caixa de entrada.');
                    form.reset();
                    mensagemCarrinho.value = '';
                })
                .catch((erro) => {
                    console.error('Erro EmailJS:', erro);
                    mostrarToast(toastContainer, 'Erro ao enviar e-mail. Tente novamente.', 'error');
                })
                .finally(() => {
                    botaoEnviar.disabled = false;
                    botaoEnviar.textContent = 'Enviar';
                });
        });
    }
});

/* ----- Função auxiliar de toast ----- */
function mostrarToast(container, mensagem, classe = '') {
    const toast = document.createElement('div');
    toast.className = `toast ${classe}`.trim();
    toast.textContent = mensagem;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.5s ease-out forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}