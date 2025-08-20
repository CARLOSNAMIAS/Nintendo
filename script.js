// ========================================
//  INICIALIZACIÓN DEL SISTEMA AL CARGAR EL DOM
// ========================================
document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  //  1. DATOS Y VARIABLES GLOBALES
  // ========================================

  // Variable global para almacenar el estado actual del carrito de compras
  // Utiliza CartLogic (módulo externo) para obtener el carrito persistente
  let cart = CartLogic.getCart();

  // --- DATOS DE LA APLICACIÓN ---
  
  // Array de productos populares con información básica para el catálogo principal
  const popularProductsData = [
    { imgSrc: './img/futbol2.avif', title: 'EA SPORTS FC™ 24', description: 'La experiencia futbolística más auténtica', price: 59.99 },
    { imgSrc: './img/futbol.avif', title: 'EA SPORTS FC™ 25', description: 'Nuevas formas de ganar por el club', price: 69.99 },
    { imgSrc: './img/NBA202.avif', title: 'NBA 2K25', description: 'Acumula victorias y haz historia', price: 59.99 },
    { imgSrc: './img/imgc1.avif', title: 'Super Mario Bros. Wonder', description: 'Una nueva aventura llena de sorpresas.', price: 59.99 }
  ];

  // Array de juegos Pokémon con información específica para la sección temática
  // Incluye texto personalizado para botones de demo y clases CSS específicas
  const pokemonData = [
    { imgSrc: './img/pokemon.avif', title: 'Pokémon™ Violet', text: 'Atrapa, combate y entrena Pokémon en la región de Paldea', demoText: '🎮 Probar Demo', cardClass: '' },
    { imgSrc: './img/pokemon2.avif', title: 'Detective Pikachu™ Returns', text: 'Descifra misterios con un parlanchín Pikachu', demoText: '🕵️ Probar Demo', cardClass: 'pokemon-card-2' },
    { imgSrc: './img/pokemon3.avif', title: 'Pokémon™ Brilliant Diamond', text: '¡Conviértete en el Campeón de la Liga Pokémon!', demoText: '💎 Probar Demo', cardClass: 'pokemon-card-3' }
  ];

  // Array de personajes interactivos con datos completos para modales y efectos
  // Cada personaje incluye ID único, sonido asociado y descripción detallada
  const characterData = [
    { id: 'mario', name: 'Mario', imgSrc: './img/mario-bros.png', sound: './sound/notificacion.mp3', description: "El héroe icónico del Reino Champiñón, siempre listo para saltar a la acción y frustrar los planes de Bowser.", tag: "Super Mario" },
    { id: 'luigi', name: 'Luigi', imgSrc: './img/luigii.png', sound: './sound/notificacion.mp3', description: "El hermano menor de Mario. Aunque es un poco miedoso, es muy leal y ha salvado el día en más de una ocasión.", tag: "Super Mario" },
    { id: 'peach', name: 'Peach', imgSrc: './img/princesaa.PNG', sound: './sound/notificacion.mp3', description: "La amable y elegante princesa del Reino Champiñón. A menudo es secuestrada por Bowser, pero no duda en unirse a la aventura.", tag: "Super Mario" },
    { id: 'bowser', name: 'Bowser', imgSrc: './img/bower.png', sound: './sound/notificacion.mp3', description: "El rey de los Koopas y archienemigo de Mario. Su principal objetivo es conquistar el Reino Champiñón y casarse con Peach.", tag: "Super Mario" },
    { id: 'wario', name: 'Wario', imgSrc: './img/wario.png', sound: './sound/notificacion.mp3', description: "El avaro y musculoso rival de Mario. Es el polo opuesto a nuestro héroe, motivado por la codicia y el ajo.", tag: "WarioWare" }
  ];

  // Array de noticias para la sección informativa
  // Incluye etiquetas categorizadas con clases CSS específicas
  const newsData = [
    { imgSrc: './img/zelda.avif', tag: 'Nintendo Direct', tagClass: 'tag-direct', title: 'Resumen del Nintendo Direct de Junio 2024', text: 'Un vistazo a todos los anuncios, desde Metroid Prime 4: Beyond hasta The Legend of Zelda: Echoes of Wisdom.' },
    { imgSrc: './img/futbol.avif', tag: 'eSports', tagClass: 'tag-esports', title: '¡El campeonato de Splatoon 3 llega a Nintendo Live!', text: 'Los mejores equipos compiten por la gloria en el torneo más colorido del año. ¡Entérate de los detalles!' },
    { imgSrc: './img/pokemon3.avif', tag: 'Actualización', tagClass: 'tag-update', title: 'Nuevos eventos de Tera-Incursiones en Pokémon', text: 'Prepara a tu equipo para enfrentarte a nuevos y poderosos Pokémon Paradoja en eventos por tiempo limitado.' }
  ];

  // Referencias a elementos del DOM para manipulación dinámica
  const productContainer = document.getElementById('productContainer');       // Contenedor de productos principales
  const pokemonContainer = document.getElementById('pokemon-cards-container'); // Contenedor de cartas Pokémon
  const characterContainer = document.getElementById('character-container');   // Contenedor de personajes interactivos
  const newsContainer = document.getElementById('news-container');             // Contenedor de noticias
  const cartCountElement = document.getElementById('cartCount');               // Contador visual del carrito
  const cartItemsContainer = document.getElementById('cartItemsContainer');    // Lista de productos en el carrito
  const totalPriceElement = document.getElementById('totalPrice');             // Precio total del carrito
  const clearCartButton = document.getElementById('clearCart');                // Botón para vaciar carrito

  // ========================================
  //  2. RENDERIZADO DINÁMICO
  // ========================================

  /**
   * Función genérica para renderizar arrays de datos en contenedores del DOM
   * @param {HTMLElement} container - Elemento contenedor donde insertar el HTML
   * @param {Array} items - Array de objetos con los datos a renderizar
   * @param {Function} renderer - Función que convierte cada item en HTML string
   */
  function renderItems(container, items, renderer) {
    if (!container) return; // Validación para evitar errores si el contenedor no existe
    container.innerHTML = items.map(renderer).join(''); // Aplica renderer a cada item y une el HTML
  }

  /**
   * Genera HTML para una tarjeta de producto del catálogo principal
   * @param {Object} p - Objeto producto con propiedades: imgSrc, title, description, price
   * @returns {string} HTML string de la tarjeta de producto
   */
  const productRenderer = (p) => `
    <div class="product-card fade-in-up">
      <img src="${p.imgSrc}" alt="${p.title}">
      <h3 class="product-title">${p.title}</h3>
      <p class="text-light">${p.description}</p>
      <p class="product-price">$${p.price.toFixed(2)}</p>
      <button class="btn btn-primary add-to-cart-btn">🛒 Agregar al carrito</button>
    </div>`;

  /**
   * Genera HTML para una tarjeta de juego Pokémon
   * @param {Object} p - Objeto Pokémon con propiedades: imgSrc, title, text, demoText, cardClass
   * @returns {string} HTML string de la tarjeta Pokémon
   */
  const pokemonRenderer = (p) => `
    <div class="pokemon-card ${p.cardClass} fade-in-up">
      <img src="${p.imgSrc}" class="card-img-top" alt="${p.title}">
      <div class="card-body text-center p-4">
        <h5 class="card-title">${p.title}</h5>
        <p class="card-text">${p.text}</p>
        <a href="#" class="btn btn-primary">${p.demoText}</a>
      </div>
    </div>`;

  /**
   * Genera HTML para una tarjeta de personaje interactivo
   * @param {Object} c - Objeto personaje con propiedades: id, imgSrc, name
   * @returns {string} HTML string de la tarjeta de personaje
   */
  const characterRenderer = (c) => `
    <div class="character-card fade-in-up" data-character-id="${c.id}">
      <img src="${c.imgSrc}" alt="${c.name}">
      <div class="character-name-plate"><span>${c.name}</span></div>
    </div>`;

  /**
   * Genera HTML para una tarjeta de noticia
   * @param {Object} n - Objeto noticia con propiedades: imgSrc, tag, tagClass, title, text
   * @returns {string} HTML string de la tarjeta de noticia
   */
  const newsRenderer = (n) => `
    <div class="news-card fade-in-up">
      <div class="news-card-img-container"><img src="${n.imgSrc}" alt="${n.title}"></div>
      <div class="news-card-body">
        <span class="news-card-tag ${n.tagClass}">${n.tag}</span>
        <h3 class="news-card-title">${n.title}</h3>
        <p class="news-card-text">${n.text}</p>
        <a href="#" class="btn btn-outline-light">Leer más <i class="bi bi-arrow-right-short"></i></a>
      </div>
    </div>`;

  // ========================================
  //  3. LÓGICA DEL CARRITO (UI OFFCANVAS)
  // ========================================
  
  /**
   * Actualiza la interfaz visual del carrito offcanvas
   * Sincroniza el estado del carrito con la visualización en pantalla
   */
  function updateOffcanvasUI() {
    cart = CartLogic.getCart(); // Obtiene la versión más actualizada del carrito desde el almacenamiento
    
    // Actualiza el contador de productos en el icono del carrito
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Limpia el contenedor antes de re-renderizar
    cartItemsContainer.innerHTML = '';
    
    // Si el carrito está vacío, muestra mensaje informativo
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="text-center p-5"><p>Tu carrito está vacío.</p></div>';
      totalPriceElement.textContent = '$0.00';
      return;
    }
    
    // Calcula el total y renderiza cada producto del carrito
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity; // Acumula el precio total
      
      // Genera HTML para cada item del carrito con controles de cantidad
      const cartItemHTML = `
        <div class="d-flex align-items-center mb-3 p-2 rounded" style="background-color: rgba(255,255,255,0.05);">
          <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3 object-fit-cover">
          <div class="flex-grow-1">
            <p class="mb-0 fw-bold">${item.name}</p>
            <p class="mb-1 text-muted">$${item.price.toFixed(2)}</p>
            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
          </div>
          <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${item.id}">×</button>
        </div>
      `;
      cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    // Actualiza el precio total mostrado
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  // ========================================
  //  4. MANEJO DE EVENTOS
  // ========================================

  /**
   * Event listener para el contenedor de productos principales
   * Maneja clicks en botones "Agregar al carrito"
   */
  if (productContainer) {
    productContainer.addEventListener('click', (e) => {
      // Verifica si el click fue en un botón de agregar al carrito
      if (e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault(); // Previene comportamiento por defecto del botón
        
        // Obtiene información del producto desde el DOM
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const priceText = productCard.querySelector('.product-price').textContent;
        
        // Crea objeto producto para agregar al carrito
        const product = {
          id: productName.replace(/\s+/g, '-').toLowerCase(), // Genera ID único basado en el nombre
          name: productName,
          price: parseFloat(priceText.replace(/[^0-9.]/g, '')), // Extrae solo números del precio
          image: productCard.querySelector('img').src
        };
        
        // Agrega al carrito usando CartLogic y actualiza la UI
        cart = CartLogic.addToCart(product);
        updateOffcanvasUI();
        showNotification(product.name, product.image); // Muestra notificación de confirmación
      }
    });
  }

  /**
   * Event listener para el contenedor de items del carrito
   * Maneja modificación de cantidades y eliminación de productos
   */
  cartItemsContainer.addEventListener('click', (e) => {
    const target = e.target;
    const productId = target.closest('[data-id]')?.dataset.id; // Obtiene ID del producto
    if (!productId) return; // Sale si no encuentra ID

    // Maneja eliminación completa del producto
    if (target.classList.contains('remove-btn')) { 
      cart = CartLogic.removeFromCart(productId); 
    }
    
    // Maneja cambios de cantidad (aumentar/disminuir)
    if (target.classList.contains('quantity-btn')) { 
      cart = CartLogic.changeQuantity(productId, target.dataset.action); 
    }
    
    updateOffcanvasUI(); // Actualiza interfaz después de cualquier cambio
  });

  /**
   * Event listener para el botón de limpiar carrito
   * Vacía completamente el carrito de compras
   */
  clearCartButton.addEventListener('click', () => {
    cart = CartLogic.clearCart();
    updateOffcanvasUI();
  });

  /**
   * Event listener para el contenedor de personajes
   * Maneja clicks en tarjetas de personajes para mostrar modal y efectos
   */
  if (characterContainer) {
      characterContainer.addEventListener('click', (e) => {
          const card = e.target.closest('.character-card'); // Busca la tarjeta clickeada
          if (!card) return;
          
          const charId = card.dataset.characterId; // Obtiene ID del personaje
          const char = characterData.find(c => c.id === charId); // Busca datos del personaje
          if (!char) return;
          
          // Ejecuta efectos interactivos
          playCharacterSound(char.sound);    // Reproduce sonido del personaje
          createClickParticles(card);        // Crea efecto de partículas
          showCharacterModal(char);          // Muestra modal con información
      });
  }

  // ========================================
  //  5. MODALES Y NOTIFICACIONES
  // ========================================

  /**
   * Muestra una notificación toast cuando se agrega un producto al carrito
   * @param {string} productName - Nombre del producto agregado
   * @param {string} productImage - URL de la imagen del producto
   */
  function showNotification(productName, productImage) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    // Crea elemento de notificación
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <img src="${productImage}" alt="${productName}">
      <div class="toast-notification-content">
        <p>${productName}</p>
        <span>Se agregó a tu carrito.</span>
      </div>
    `;
    
    // Añade al DOM y activa animación
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => { toast.classList.add('show'); }); // Fuerza repaint para animación
    
    // Programa eliminación automática después de 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove()); // Limpia DOM después de animación
    }, 3000);
  }

  // Referencias para el modal de personajes
  const characterModal = document.getElementById('characterModal');
  
  /**
   * Muestra modal con información detallada del personaje
   * @param {Object} character - Objeto con datos del personaje (imgSrc, name, description, tag)
   */
  function showCharacterModal(character) {
      if (!characterModal) return;
      
      // Actualiza contenido del modal con datos del personaje
      const characterModalBody = document.getElementById('characterModalBody');
      characterModalBody.innerHTML = `
          <img src="${character.imgSrc}" class="character-modal-img" alt="${character.name}">
          <h2 class="character-modal-title">${character.name}</h2>
          <p class="character-modal-description">${character.description}</p>
          <span class="character-modal-tag">${character.tag}</span>`;
      
      // Muestra modal con animación
      characterModal.style.display = 'flex';
      characterModal.querySelector('.modal-content-modern').classList.add('show');
  }
  
  /**
   * Cierra el modal de personaje con animación
   */
  function closeCharacterModalFunction() {
      const modalContent = characterModal.querySelector('.modal-content-modern');
      modalContent.classList.remove('show'); // Inicia animación de salida
      setTimeout(() => { characterModal.style.display = 'none'; }, 300); // Oculta después de animación
  }
  
  // Event listeners para cerrar modal
  document.getElementById('closeCharacterModal')?.addEventListener('click', closeCharacterModalFunction);
  characterModal?.addEventListener('click', (e) => {
    // Cierra modal si se hace click en el fondo (backdrop)
    if (e.target === characterModal) closeCharacterModalFunction();
  });

  // ========================================
  //  6. OTRAS FUNCIONALIDADES
  // ========================================
  // Sección reservada para funcionalidades adicionales futuras

  // ========================================
  //  7. EJECUCIÓN INICIAL
  // ========================================

  // Renderiza todos los contenidos dinámicos al cargar la página
  renderItems(productContainer, popularProductsData, productRenderer);  // Renderiza productos principales
  renderItems(pokemonContainer, pokemonData, pokemonRenderer);          // Renderiza sección Pokémon
  renderItems(characterContainer, characterData, characterRenderer);    // Renderiza galería de personajes
  renderItems(newsContainer, newsData, newsRenderer);                   // Renderiza noticias
  
  // Inicializa estado de la interfaz del carrito
  updateOffcanvasUI();
  
  // Activa observador de animaciones fade-in (función definida externamente)
  observeFadeIn();

});

// ========================================
//  FUNCIONES GLOBALES (fuera del scope del DOMContentLoaded)
// ========================================

/**
 * Activa efecto visual de estrella en un botón
 * @param {HTMLElement} button - Elemento botón al que aplicar el efecto
 */
function activateStarEffect(button) {
  button.classList.remove('active');  // Remueve clase activa previa
  void button.offsetWidth;           // Fuerza reflow para reiniciar animación
  button.classList.add('active');    // Añade clase que activa la animación CSS
  
  // Remueve la clase después de 3 segundos para permitir repetir efecto
  setTimeout(() => {
    button.classList.remove('active');
  }, 3000);
}

/**
 * Reproduce sonido asociado a un personaje
 * @param {string} soundPath - Ruta del archivo de audio a reproducir
 */
function playCharacterSound(soundPath) { 
    if (soundPath) {
        const audio = new Audio(soundPath);
        audio.volume = 0.7; // Establece volumen al 70%
        
        // Reproduce audio con manejo de errores
        audio.play().catch(error => console.log('Error al reproducir sonido:', error));
    }
}

/**
 * Crea efecto visual de partículas al hacer click en un personaje
 * @param {HTMLElement} element - Elemento sobre el cual crear las partículas
 */
function createClickParticles(element) {
  const characterId = element.dataset.characterId;
  const rect = element.getBoundingClientRect(); // Obtiene posición del elemento en pantalla
  
  // Define colores específicos para cada personaje
  const colors = {
    mario: ['#E60012', '#FFD700'],      // Rojo y dorado
    luigi: ['#00AA00', '#90EE90'],      // Verde y verde claro
    peach: ['#FF69B4', '#FFC0CB'],      // Rosa y rosa claro
    bowser: ['#8B4513', '#FF4500'],     // Marrón y naranja
    wario: ['#FFD700', '#FFA500']       // Dorado y naranja
  };
  
  const particleColors = colors[characterId] || ['#FFD700']; // Color por defecto: dorado
  
  // Crea 12 partículas distribuidas en círculo
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    
    // Posiciona partícula en el centro del elemento clickeado
    particle.style.left = (rect.left + rect.width / 2) + 'px';
    particle.style.top = (rect.top + rect.height / 2) + 'px';
    
    // Calcula dirección de movimiento (distribución circular)
    const angle = (360 / 12) * i;  // Divide círculo en 12 partes iguales
    const distance = 60 + Math.random() * 30; // Distancia aleatoria entre 60-90px
    const dx = Math.cos(angle * Math.PI / 180) * distance; // Componente X del movimiento
    const dy = Math.sin(angle * Math.PI / 180) * distance; // Componente Y del movimiento
    
    // Establece variables CSS para la animación
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');
    
    // Asigna color aleatorio del array de colores del personaje
    particle.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
    
    // Añade partícula al DOM
    document.body.appendChild(particle);
    
    // Elimina partícula después de la animación (800ms)
    setTimeout(() => particle.remove(), 800);
  }
}