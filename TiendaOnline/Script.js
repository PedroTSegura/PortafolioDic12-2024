let cart = [];

// Agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productId = product.getAttribute('data-id');
        const productName = product.querySelector('p').innerText;
        const productPrice = parseFloat(product.getAttribute('data-price'));

        // Añadir el producto al carrito con el precio
        cart.push({ id: productId, name: productName, price: productPrice });
        updateCart();
    });
});

// Vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    updateCart();
});

// Función para actualizar el carrito
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
            <button class="remove-item" data-index="${index}">Eliminar</button>`;
        cartItemsContainer.appendChild(li);
    });

    // Actualizar el contador en el header
    document.querySelector('nav ul li a[href="#carrito"]').innerText = `Carrito (${cart.length})`;

    // Agregar eventos de eliminación
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemIndex = parseInt(this.getAttribute('data-index'), 10); // Obtener el índice
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1); // Eliminar solo ese producto
                updateCart();
            }
        });
    });

    // Mostrar el botón de pago si hay productos en el carrito
    if (cart.length > 0) {
        document.getElementById('pay-button').style.display = 'block';
    } else {
        document.getElementById('pay-button').style.display = 'none';
    }
}

// Función para calcular el monto total del carrito
function calculateTotalAmount() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Evento para el botón de pagar
document.getElementById('pay-button').addEventListener('click', function() {
    const totalAmount = calculateTotalAmount();
    alert(`Pago completado. Total pagado: $${totalAmount.toFixed(2)}`);
    
    // Vaciar el carrito
    cart = [];
    updateCart();
    document.getElementById('qrcode-container').style.display = 'none';
    this.style.display = 'none';
});

// Método simulado de escaneo de QR (esto debería ser reemplazado con tu propio sistema de escaneo)
document.getElementById('qr-scanner').addEventListener('change', function() {
    if (cart.length > 0) {
        // Al escanear el QR, mostrar un mensaje y vaciar el carrito automáticamente
        const totalAmount = calculateTotalAmount();
        alert(`Pago completado. Total pagado: $${totalAmount.toFixed(2)}`);
        
        // Vaciar el carrito
        cart = [];
        updateCart();
        document.getElementById('pay-button').style.display = 'none'; // Ocultar el botón de pago
        document.getElementById('qrcode-container').style.display = 'none'; // Ocultar el contenedor del QR
    }
});