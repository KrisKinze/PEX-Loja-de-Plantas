/* ============================================================ */
/* ADICIONAR AO CARRINHO */
/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.getElementById('toast-container');
    const mensagemCarrinho = document.getElementById('mensagem-carrinho');
    let totalCarrinho = 0;

    const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');

    botoesAdicionarCarrinho.forEach(botao => {
        botao.addEventListener('click', () => {
            const nome = botao.getAttribute('data-nome');
            const valor = botao.getAttribute('data-valor');
            const valorNumerico = parseFloat(valor.replace('R$', '').replace(',', '.'));

            totalCarrinho += valorNumerico;

            if (mensagemCarrinho) {
                const linhas = mensagemCarrinho.value.split('\n');
                const linhasSemTotal = linhas.filter(linha => !linha.startsWith('Total:'));
                mensagemCarrinho.value = linhasSemTotal.join('\n');
                mensagemCarrinho.value += `${nome} - ${valor}\n`;
                mensagemCarrinho.value += `Total: R$ ${totalCarrinho.toFixed(2)}\n`;
            }

            if (toastContainer) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = `${nome} foi adicionado ao carrinho! Verifique a aba de CONTATO.`;
                toastContainer.appendChild(toast);

                setTimeout(() => {
                    toast.remove();
                }, 4000);
            }
        });
    });
});