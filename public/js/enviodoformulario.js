/* ============================================================ */
/* FORMULÁRIO DE CONTATO E ENVIO DE EMAIL */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    const mensagemCarrinho = document.getElementById('mensagem-carrinho');
    const toastContainer = document.getElementById('toast-container');
    const botaoEnviar = document.getElementById('botao-enviar');
    const botaoResetarCarrinho = document.getElementById('resetar-carrinho');

    const backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3000/enviar-email'
        : 'https://jardim-vital-backend-qxd7.onrender.com/enviar-email';

    if (botaoResetarCarrinho && mensagemCarrinho) {
        botaoResetarCarrinho.addEventListener('click', () => {
            if (mensagemCarrinho.value.trim() === '') {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = 'O carrinho já está vazio!';
                toastContainer.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
                return;
            }
            
            mensagemCarrinho.value = '';
            
            const toast = document.createElement('div');
            toast.className = 'toast toast-carrinho';
            toast.textContent = '🗑️ Carrinho resetado com sucesso!';
            toastContainer.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideDown 0.5s ease-out forwards';
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        });
    }

    if (form && mensagemCarrinho && toastContainer && botaoEnviar) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            botaoEnviar.disabled = true;
            botaoEnviar.textContent = 'Enviando...';

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagemUsuario = document.getElementById('mensagem').value;
            const itensCarrinho = mensagemCarrinho.value;
            const mensagemCompleta = `${mensagemUsuario}\n\nItens do Carrinho:\n${itensCarrinho || 'Nenhum item adicionado'}`;

            try {
                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, mensagem: mensagemCompleta })
                });

                let toastMessage, toastClass = 'toast';

                if (response.ok) {
                    toastMessage = 'E-mail enviado com sucesso! Verifique sua caixa de entrada.';
                    form.reset();
                    mensagemCarrinho.value = '';
                } else {
                    const errorData = await response.text();
                    toastMessage = `Erro ao enviar e-mail: ${errorData}`;
                    toastClass += ' error';
                }

                const toast = document.createElement('div');
                toast.className = toastClass;
                toast.textContent = toastMessage;
                toastContainer.appendChild(toast);
                setTimeout(() => toast.remove(), 5000);

            } catch (error) {
                const toast = document.createElement('div');
                toast.className = 'toast error';
                toast.textContent = 'Erro de conexão ao tentar enviar o e-mail.';
                toastContainer.appendChild(toast);
                setTimeout(() => toast.remove(), 5000);
            } finally {
                botaoEnviar.disabled = false;
                botaoEnviar.textContent = 'Enviar';
            }
        });
    }
});