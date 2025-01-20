document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsElement = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const notificationSound = new Audio('Audio/notificacion.mp3');
    const removeSound = new Audio('Audio/remove.mp3');
    const notificationModal = document.getElementById('notificationModal');
    const addedProductImage = document.getElementById('addedProductImage');
    const addedProductTitle = document.getElementById('addedProductTitle');

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    function updateCartDisplay() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.title} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>`;
            cartItemsElement.appendChild(cartItemElement);
        });
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
        updateCartCount();
    }

    function playNotificationSound() {
        notificationSound.play();
    }

    function playRemoveSound() {
        removeSound.play();
    }

    // Mostrar la ventana emergente con la imagen del producto
    function showNotificationModal(title, imageSrc) {
        addedProductTitle.textContent = title;
        addedProductImage.src = imageSrc;
        notificationModal.style.display = 'block';
    }

    // Cerrar la ventana emergente
    document.querySelector('.close').addEventListener('click', function() {
        notificationModal.style.display = 'none';
    });

    // Escuchar clics en botones de agregar al carrito
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            const priceText = card.querySelector('.card-text').textContent;
            const price = parseFloat(priceText.replace(/[^0-9,.]/g, '').replace(',', '.'));
            const imageSrc = card.querySelector('img').src; // Obtener la URL de la imagen
            cart.push({ title, price, imageSrc });
            updateCartDisplay();
            playNotificationSound();
            showNotificationModal(title, imageSrc); // Mostrar la ventana emergente
        });
    });

    cartItemsElement.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-danger')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartDisplay();
            playRemoveSound();
        }
    });

    document.getElementById('clearCart').addEventListener('click', function () {
        cart.length = 0; // Vaciar el carrito
        updateCartDisplay();
    });
});
