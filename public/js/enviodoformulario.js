const formulario = document.getElementById('form-contato');
const botaoEnviar = document.getElementById('botao-enviar');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    const mensagemCarrinho = document.getElementById('mensagem-carrinho').value; // Captura os itens do carrinho

    const mensagemCompleta = `${mensagem}\n\nItens do Carrinho:\n${mensagemCarrinho}`;

    if (!nome || !email || !mensagem.trim()) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    botaoEnviar.disabled = true; // Desativa o botão enquanto o email está sendo enviado
    botaoEnviar.textContent = 'Enviando...';

    fetch('http://localhost:3000/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, mensagem: mensagemCompleta }) // Envia a mensagem completa
    })
        .then(response => {
            botaoEnviar.disabled = false; // Reativa o botão
            botaoEnviar.textContent = 'Enviar';

            if (response.ok) {
                alert('Obrigado por entrar em contato! Seu email foi enviado com sucesso.');
                formulario.reset(); // Limpa o formulário
                document.getElementById('mensagem-carrinho').value = ''; // Limpa o campo do carrinho
            } else {
                return response.text().then(text => {
                    alert(`Erro: ${text}`);
                });
            }
        })
        .catch(error => {
            botaoEnviar.disabled = false; // Reativa o botão
            botaoEnviar.textContent = 'Enviar';
            console.error('Erro ao enviar o email:', error);
            alert('Ocorreu um erro ao enviar o email. Tente novamente mais tarde.');
        });
});