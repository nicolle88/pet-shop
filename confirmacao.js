// confirmacao.js

document.addEventListener('DOMContentLoaded', function () {

    // Gera número do pedido aleatório
    const numero = 'PET-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('codigo-pedido').textContent = numero;

    // Limpa os dados do checkout
    localStorage.removeItem('petcare_entrega');
    localStorage.removeItem('petcare_pagamento');
});