function avancarParaEntrega() {
    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const cpf      = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (nome === '' || email === '' || cpf === '') {
        alert('Por favor, preencha todos os campos obrigatórios (*)!');
        return;
    }

    // Salva direto no localStorage, sem depender do Storage do grupo 
    const dadosUsuario = { nome, email, cpf, telefone };
    localStorage.setItem('petcare_usuario', JSON.stringify(dadosUsuario));

    window.location.href = 'entrega.html'; // e redireciona para a pagina de entrega
}

// Atualiza o resumo lateral ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    let subtotal = 0;

    try {
        const itensCarrinho = JSON.parse(localStorage.getItem('petcare_carrinho') || '[]');
        itensCarrinho.forEach(function (p) {
            subtotal += (p.preco * p.qtd);
        });
    } catch (e) {
        subtotal = 0;
    }

    const frete = subtotal >= 200 ? 0 : 15.90; // Frete gratis para compras acima de 200, caso contrario 15.90
    const total = subtotal + frete;

    const elSubtotal = document.getElementById('resumo-subtotal');
    const elFrete    = document.getElementById('resumo-frete');
    const elTotal    = document.getElementById('resumo-total');

    if (elSubtotal) elSubtotal.textContent = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
    if (elFrete)    elFrete.textContent    = frete === 0 ? 'GRÁTIS' : 'R$ ' + frete.toFixed(2).replace('.', ',');
    if (elTotal)    elTotal.textContent    = 'R$ ' + total.toFixed(2).replace('.', ',');
});
