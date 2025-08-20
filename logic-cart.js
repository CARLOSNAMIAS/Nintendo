/**
 * logic-cart.js
 * Este archivo contiene toda la lógica de negocio para manipular el carrito de compras.
 * No interactúa directamente con el DOM, solo maneja los datos.
 */

const CartLogic = {
  /**
   * Obtiene el carrito desde localStorage.
   * @returns {Array} El array del carrito.
   */
  getCart: function() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
  },

  /**
   * Guarda el carrito en localStorage.
   * @param {Array} cart - El array del carrito a guardar.
   */
  saveCart: function(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  },

  /**
   * Agrega un producto al carrito o incrementa su cantidad.
   * @param {object} product - El producto a agregar.
   * @returns {Array} El nuevo estado del carrito.
   */
  addToCart: function(product) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(cart);
    return cart;
  },

  /**
   * Elimina un producto del carrito por su ID.
   * @param {string} productId - El ID del producto a eliminar.
   * @returns {Array} El nuevo estado del carrito.
   */
  removeFromCart: function(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    return cart;
  },

  /**
   * Cambia la cantidad de un producto.
   * @param {string} productId - El ID del producto.
   * @param {string} action - 'increase' o 'decrease'.
   * @returns {Array} El nuevo estado del carrito.
   */
  changeQuantity: function(productId, action) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
      if (action === 'increase') {
        item.quantity++;
      } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
          // Si la cantidad llega a 0, eliminamos el item.
          return this.removeFromCart(productId);
        }
      }
      this.saveCart(cart);
    }
    return cart;
  },

  /**
   * Vacía completamente el carrito.
   * @returns {Array} Un array de carrito vacío.
   */
  clearCart: function() {
    const cart = [];
    this.saveCart(cart);
    return cart;
  }
};