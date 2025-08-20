document.addEventListener('DOMContentLoaded', () => {
  const summaryItemsContainer = document.getElementById('checkout-summary-items');
  const summaryItemCount = document.getElementById('summary-item-count');

  const cart = CartLogic.getCart();

  function renderSummary() {
    if (!summaryItemsContainer) return;

    summaryItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      totalItems += item.quantity;

      const itemHTML = `
        <li class="list-group-item summary-item">
          <div class="item-info">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h6 class="my-0">${item.name}</h6>
              <small class="text-muted">Cantidad: ${item.quantity}</small>
            </div>
          </div>
          <span class="text-muted">$${itemTotal.toFixed(2)}</span>
        </li>
      `;
      summaryItemsContainer.innerHTML += itemHTML;
    });

    // Añadir el subtotal y total al final de la lista
    const totalsHTML = `
      <li class="list-group-item d-flex justify-content-between">
        <span>Subtotal</span>
        <strong>$${subtotal.toFixed(2)}</strong>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Envío</span>
        <strong>$10.00</strong>
      </li>
      <li class="list-group-item d-flex justify-content-between bg-light">
        <span class="text-danger">Total (USD)</span>
        <strong class="text-danger">$${(subtotal + 10).toFixed(2)}</strong>
      </li>
    `;
    summaryItemsContainer.innerHTML += totalsHTML;

    summaryItemCount.textContent = totalItems;
  }

  renderSummary();

});
