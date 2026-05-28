// revisao.js

document.addEventListener('DOMContentLoaded', function () {

    const entrega  = JSON.parse(localStorage.getItem('petcare_entrega')  || '{}');
    const pagamento = JSON.parse(localStorage.getItem('petcare_pagamento') || '{}');

    // Monta texto de entrega
    let textoEntrega = 'Endereço não informado';

    if (entrega.rua) {
        const partes = [entrega.rua];
        if (entrega.numero)      partes[0] += `, ${entrega.numero}`;
        if (entrega.complemento) partes.push(entrega.complemento);
        if (entrega.bairro)      partes.push(entrega.bairro);
        if (entrega.cidade)      partes.push(entrega.cidade);
        if (entrega.estado)      partes.push(entrega.estado);
        if (entrega.cep)         partes.push(`CEP ${entrega.cep}`);
        textoEntrega = partes.join(' – ');
    }

    // Monta texto de pagamento
    const textoPagamento = pagamento.descricao || 'Não informado';

    // Injeta no HTML
    const itemEntrega   = document.getElementById('info-entrega');
    const itemPagamento = document.getElementById('info-pagamento');

    if (itemEntrega)   itemEntrega.textContent  = textoEntrega;
    if (itemPagamento) itemPagamento.textContent = textoPagamento;
});

// Confirmar pedido
function confirmarPedido() {
    const aleatorio = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('petcare_numero_pedido', 'PET-' + aleatorio);
    window.location.href = 'confirmacao.html';
}