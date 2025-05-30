document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    const mensagemCarrinho = document.getElementById('mensagem-carrinho');
    const toastContainer = document.getElementById('toast-container');
    const botaoEnviar = document.getElementById('botao-enviar');

    // Define a URL do backend baseada no ambiente (local vs produção)
    let backendUrl;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Ambiente local
        backendUrl = 'http://localhost:3000/enviar-email'; // URL do servidor local
    } else {
        // Ambiente de produção (GitHub Pages, etc.)
        backendUrl = 'https://jardim-vital-backend-qxd7.onrender.com/enviar-email'; // URL do Render
    }

    console.log(`Usando backend URL: ${backendUrl}`); // Útil para depuração

    if (form && mensagemCarrinho && toastContainer && botaoEnviar) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Desabilita o botão e mostra feedback
            botaoEnviar.disabled = true;
            botaoEnviar.textContent = 'Enviando...';

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagemUsuario = document.getElementById('mensagem').value;
            const itensCarrinho = mensagemCarrinho.value;

            // Combina a mensagem do usuário com os itens do carrinho
            const mensagemCompleta = `${mensagemUsuario}\n\nItens do Carrinho:\n${itensCarrinho || 'Nenhum item adicionado'}`;

            try {
                // Usa a backendUrl definida dinamicamente
                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        mensagem: mensagemCompleta
                    }),
                });

                let toastMessage = '';
                let toastClass = 'toast'; // Classe padrão

                if (response.ok) {
                    toastMessage = 'E-mail enviado com sucesso! Verifique sua caixa de entrada.';
                    form.reset(); // Limpa o formulário
                    mensagemCarrinho.value = ''; // Limpa a área do carrinho também
                } else {
                    const errorData = await response.text();
                    toastMessage = `Erro ao enviar e-mail: ${errorData}`;
                    toastClass += ' error'; // Adiciona uma classe de erro se houver
                    console.error('Erro do servidor:', errorData);
                }

                // Exibe a notificação (toast)
                const toast = document.createElement('div');
                toast.className = toastClass;
                toast.textContent = toastMessage;
                toastContainer.appendChild(toast);

                // Remove a notificação após 5 segundos
                setTimeout(() => {
                    toast.remove();
                }, 5000);

            } catch (error) {
                console.error('Erro na requisição fetch:', error);

                // Exibe notificação de erro de rede/fetch
                const toast = document.createElement('div');
                toast.className = 'toast error';
                toast.textContent = 'Erro de conexão ao tentar enviar o e-mail.';
                toastContainer.appendChild(toast);
                setTimeout(() => {
                    toast.remove();
                }, 5000);
            } finally {
                // Reabilita o botão após a tentativa
                botaoEnviar.disabled = false;
                botaoEnviar.textContent = 'Enviar';
            }
        });
    } else {
        console.error('Elementos do formulário não encontrados.');
    }
});