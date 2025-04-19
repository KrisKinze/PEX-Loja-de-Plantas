document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.getElementById('toast-container'); // Contêiner para os toasts
    const mensagemCarrinho = document.getElementById('mensagem-carrinho');
    let totalCarrinho = 0; // Variável para armazenar o total do carrinho

    const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');

    botoesAdicionarCarrinho.forEach(botao => {
        botao.addEventListener('click', () => {
            const nome = botao.getAttribute('data-nome');
            const valor = botao.getAttribute('data-valor');

            // Converte o valor para número (removendo "R$" e vírgulas)
            const valorNumerico = parseFloat(valor.replace('R$', '').replace(',', '.'));

            // Atualiza o total do carrinho
            totalCarrinho += valorNumerico;

            // Atualiza o campo de mensagem
            if (mensagemCarrinho) {
                // Remove o total anterior, se existir
                const linhas = mensagemCarrinho.value.split('\n');
                const linhasSemTotal = linhas.filter(linha => !linha.startsWith('Total:'));
                mensagemCarrinho.value = linhasSemTotal.join('\n');

                // Adiciona o novo item e o total atualizado
                mensagemCarrinho.value += `${nome} - ${valor}\n`;
                mensagemCarrinho.value += `Total: R$ ${totalCarrinho.toFixed(2)}\n`; // Exibe o total atualizado
            }

            // Exibe a notificação
            if (toastContainer) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = `${nome} foi adicionado ao carrinho! Verifique a aba de CONTATO.`;
                toastContainer.appendChild(toast);

                // Remove a notificação após 4 segundos
                setTimeout(() => {
                    toast.remove();
                }, 4000);
            } else {
                console.error('Contêiner de notificações não encontrado.');
            }
        });
    });
});