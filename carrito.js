document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-page-items-container');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryTotal = document.getElementById('summary-total');
  const shippingCost = 10.00; // Costo de envío fijo para el ejemplo

  let currentCart = CartLogic.getCart();

  /**
   * Renderiza los items del carrito y el resumen de la compra en la página.
   */
  function renderCartPage() {
    if (currentCart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="text-center p-5"><h4>Tu carrito está vacío</h4><a href="index.html" class="btn btn-primary mt-3">Volver a la tienda</a></div>';
      summarySubtotal.textContent = '$0.00';
      summaryTotal.textContent = `$${shippingCost.toFixed(2)}`; // Muestra el costo de envío base
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = ''; // Limpiar antes de renderizar

    currentCart.forEach(item => {
      subtotal += item.price * item.quantity;
      const itemHTML = `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h5>${item.name}</h5>
            <p class="text-muted mb-0">$${item.price.toFixed(2)}</p>
          </div>
          <div class="quantity-controls">
            <button class="btn btn-sm btn-outline-secondary quantity-btn" data-action="decrease">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary quantity-btn" data-action="increase">+</button>
          </div>
          <div class="fw-bold me-3">
            $${(item.price * item.quantity).toFixed(2)}
          </div>
          <div>
            <button class="btn btn-sm btn-outline-danger remove-btn">×</button>
          </div>
        </div>
      `;
      cartItemsContainer.innerHTML += itemHTML;
    });

    const total = subtotal + shippingCost;
    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryTotal.textContent = `$${total.toFixed(2)}`;
  }

  // ========================================
  //  MANEJO DE EVENTOS
  // ========================================

  cartItemsContainer.addEventListener('click', (e) => {
    const target = e.target;
    const itemRow = target.closest('.cart-item-row');
    if (!itemRow) return;

    const productId = itemRow.dataset.id;

    if (target.classList.contains('remove-btn')) {
      currentCart = CartLogic.removeFromCart(productId);
      renderCartPage(); // Re-renderizar la página
    }

    if (target.classList.contains('quantity-btn')) {
      const action = target.dataset.action;
      currentCart = CartLogic.changeQuantity(productId, action);
      renderCartPage(); // Re-renderizar la página
    }
  });

  // Renderizado inicial
  renderCartPage();
});