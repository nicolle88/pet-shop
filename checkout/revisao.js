// revisao.js

document.addEventListener('DOMContentLoaded', function () {

    const entrega = JSON.parse(localStorage.getItem('petcare_entrega') || '{}');
    const pagamento = JSON.parse(localStorage.getItem('petcare_pagamento') || '{}');

    // Monta texto de entrega
    let textoEntrega = 'Endereço não informado';

    if (entrega.rua) {
        const partes = [entrega.rua];
        if (entrega.numero) partes[0] += `, ${entrega.numero}`;
        if (entrega.complemento) partes.push(entrega.complemento);
        if (entrega.bairro) partes.push(entrega.bairro);
        if (entrega.cidade) partes.push(entrega.cidade);
        if (entrega.estado) partes.push(entrega.estado);
        if (entrega.cep) partes.push(`CEP ${entrega.cep}`);
        textoEntrega = partes.join(' – ');
    }

    // Monta texto de pagamento
    const textoPagamento = pagamento.descricao || 'Não informado';

    // Injeta no HTML
    const itemEntrega = document.getElementById('info-entrega');
    const itemPagamento = document.getElementById('info-pagamento');

    if (itemEntrega) itemEntrega.textContent = textoEntrega;
    if (itemPagamento) itemPagamento.textContent = textoPagamento;
});
// Atualiza o resumo lateral ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    let subtotal = 0;

    try {
        const itensCarrinho = JSON.parse(localStorage.getItem('petcare_carrinho') || '[]'); // le os itens do carrinho do local storage
        itensCarrinho.forEach(function (p) {
            subtotal += (p.preco * p.qtd); // soma os preços multiplicados pela quantidade de cada produto
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
// Confirmar pedido
function confirmarPedido() {
    const numero = 'PET-' + Math.floor(100000 + Math.random() * 900000);

    const usuario   = JSON.parse(localStorage.getItem('petcare_usuario')  || '{}');
    const entrega   = JSON.parse(localStorage.getItem('petcare_entrega')   || '{}');
    const pagamento = JSON.parse(localStorage.getItem('petcare_pagamento') || '{}');
    const carrinho  = JSON.parse(localStorage.getItem('petcare_carrinho')  || '[]');

    const subtotal = carrinho.reduce((s, i) => s + ((i.preco || 0) * (i.qtd || 1)), 0);
    const frete    = 19.90;
    const total    = subtotal > 0 ? subtotal + frete : frete;

    const pedido = {
        id:        Date.now(),
        numero,
        data:      new Date().toLocaleDateString('pt-BR'),
        hora:      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        cliente:   usuario.nome  || 'Não informado',
        email:     usuario.email || '',
        pagamento: pagamento.descricao || 'Não informado',
        itens:     carrinho,
        subtotal,
        frete,
        total,
    };

    const pedidos = JSON.parse(localStorage.getItem('petcare_pedidos') || '[]');
    pedidos.push(pedido);
    localStorage.setItem('petcare_pedidos', JSON.stringify(pedidos));
    localStorage.setItem('petcare_numero_pedido', numero);

    window.location.href = 'confirmacao.html';
    localStorage.removeItem('petcare_carrinho');
}