// ========================================
//  INICIALIZACIÓN DE PÁGINA DE CONFIRMACIÓN
// ========================================
/**
 * Sistema de confirmación de pedido que se ejecuta después de completar una compra
 * Funcionalidades principales:
 * - Genera número único de pedido basado en timestamp
 * - Muestra resumen detallado de productos comprados
 * - Calcula y presenta el total final con gastos de envío
 * - Limpia el carrito para futuras compras
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  //  REFERENCIAS DOM Y VARIABLES
  // ========================================
  
  // Elemento donde se mostrará el número de orden generado
  const orderNumberEl = document.getElementById('order-number');
  
  // Contenedor donde se renderizará el resumen detallado de la compra
  const summaryContainer = document.getElementById('confirmation-summary');

  // ========================================
  //  CAPTURA DE DATOS DEL PEDIDO
  // ========================================
  
  /**
   * 1. OBTENER EL CARRITO ANTES DE LIMPIARLO
   * Es crucial capturar el carrito completo ANTES de vaciarlo para poder
   * mostrar el resumen de la compra al usuario
   */
  const finalCart = CartLogic.getCart();

  // ========================================
  //  GENERACIÓN DE NÚMERO DE ORDEN
  // ========================================
  
  /**
   * 2. GENERAR Y MOSTRAR NÚMERO DE ORDEN ÚNICO
   * Utiliza timestamp Unix (segundos desde epoch) para crear un número único
   * que sirve como identificador del pedido
   */
  if (orderNumberEl) {
    // Genera número de orden basado en timestamp actual (en segundos)
    // Math.floor(Date.now() / 1000) convierte milisegundos a segundos
    orderNumberEl.textContent = Math.floor(Date.now() / 1000);
  }

  // ========================================
  //  RENDERIZADO DEL RESUMEN DE COMPRA
  // ========================================
  
  /**
   * Verifica que exista el contenedor de resumen Y que el carrito tenga productos
   * Solo procede si ambas condiciones se cumplen
   */
  if (summaryContainer && finalCart.length > 0) {
    
    // Variable para acumular el subtotal de todos los productos
    let subtotal = 0;
    
    // Limpia el contenedor antes de agregar nuevo contenido
    summaryContainer.innerHTML = '';
    
    /**
     * Itera sobre cada producto del carrito final para:
     * - Calcular el subtotal acumulativo
     * - Generar HTML individual para cada producto
     * - Mostrar cantidad y precio total por producto
     */
    finalCart.forEach(item => {
      // Acumula el precio total del item (precio unitario × cantidad)
      subtotal += item.price * item.quantity;
      
      // Genera HTML para mostrar cada producto en el resumen
      const itemHTML = `
        <div class="d-flex justify-content-between">
          <span>${item.name} (x${item.quantity})</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `;
      
      // Añade el HTML del producto al contenedor
      summaryContainer.innerHTML += itemHTML;
    });
    
    // Añade separador visual entre productos y total
    summaryContainer.innerHTML += '<hr>';
    
    /**
     * CÁLCULO DEL TOTAL FINAL
     * Añade $10.00 fijos como costo de envío al subtotal
     * El total mostrado incluye: subtotal + gastos de envío ($10)
     */
    summaryContainer.innerHTML += `
      <div class="d-flex justify-content-between fw-bold">
        <span>Total Pagado:</span>
        <span>$${(subtotal + 10).toFixed(2)}</span>
      </div>
    `;
    
  } else if (summaryContainer) {
    /**
     * MANEJO DE CASO ERROR
     * Si no hay productos en el carrito o no se puede acceder a los datos,
     * muestra mensaje informativo al usuario
     */
    summaryContainer.innerHTML = '<p>No se encontró información del pedido.</p>';
  }

  // ========================================
  //  LIMPIEZA DEL CARRITO
  // ========================================
  
  /**
   * 3. LIMPIAR EL CARRITO PARA LA PRÓXIMA COMPRA (¡PASO CRUCIAL!)
   * 
   * Este paso es fundamental en el flujo de compra:
   * - Se ejecuta DESPUÉS de mostrar el resumen (por eso capturamos finalCart antes)
   * - Vacía completamente el carrito usando CartLogic.clearCart()
   * - Prepara el sistema para una nueva sesión de compra
   * - Evita que productos de compras anteriores aparezcan en futuras sesiones
   * 
   * NOTA IMPORTANTE: Este clearCart() debe ejecutarse solo en la página de
   * confirmación, nunca en otras páginas, para evitar pérdida accidental de datos
   */
  CartLogic.clearCart();

});