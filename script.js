// ========================================
//  INICIALIZACIÓN DEL SISTEMA AL CARGAR EL DOM
// ========================================
document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  //  1. DATOS Y VARIABLES GLOBALES
  // ========================================

  let cart = CartLogic.getCart();

  const popularProductsData = [
    { imgSrc: './img/futbol2.avif', title: 'EA SPORTS FC™ 24', description: 'La experiencia futbolística más auténtica', price: 59.99 },
    { imgSrc: './img/futbol.avif', title: 'EA SPORTS FC™ 25', description: 'Nuevas formas de ganar por el club', price: 69.99 },
    { imgSrc: './img/NBA202.avif', title: 'NBA 2K25', description: 'Acumula victorias y haz historia', price: 59.99 },
    { imgSrc: './img/imgc1.avif', title: 'Super Mario Bros. Wonder', description: 'Una nueva aventura llena de sorpresas.', price: 59.99 }
  ];

  const pokemonData = [
    { imgSrc: './img/pokemon.avif', title: 'Pokémon™ Violet', text: 'Atrapa, combate y entrena Pokémon en la región de Paldea', demoText: '🎮 Probar Demo', cardClass: '' },
    { imgSrc: './img/pokemon2.avif', title: 'Detective Pikachu™ Returns', text: 'Descifra misterios con un parlanchín Pikachu', demoText: '🕵️ Probar Demo', cardClass: 'pokemon-card-2' },
    { imgSrc: './img/pokemon3.avif', title: 'Pokémon™ Brilliant Diamond', text: '¡Conviértete en el Campeón de la Liga Pokémon!', demoText: '💎 Probar Demo', cardClass: 'pokemon-card-3' }
  ];

  const characterData = [
    { id: 'mario', name: 'Mario', imgSrc: './img/mario-bros.png', sound: './sound/notificacion.mp3', description: "El héroe icónico del Reino Champiñón, siempre listo para saltar a la acción y frustrar los planes de Bowser.", tag: "Super Mario" },
    { id: 'luigi', name: 'Luigi', imgSrc: './img/luigii.png', sound: './sound/notificacion.mp3', description: "El hermano menor de Mario. Aunque es un poco miedoso, es muy leal y ha salvado el día en más de una ocasión.", tag: "Super Mario" },
    { id: 'peach', name: 'Peach', imgSrc: './img/princesaa.PNG', sound: './sound/notificacion.mp3', description: "La amable y elegante princesa del Reino Champiñón. A menudo es secuestrada por Bowser, pero no duda en unirse a la aventura.", tag: "Super Mario" },
    { id: 'bowser', name: 'Bowser', imgSrc: './img/bower.png', sound: './sound/notificacion.mp3', description: "El rey de los Koopas y archienemigo de Mario. Su principal objetivo es conquistar el Reino Champiñón y casarse con Peach.", tag: "Super Mario" },
    { id: 'wario', name: 'Wario', imgSrc: './img/wario.png', sound: './sound/notificacion.mp3', description: "El avaro y musculoso rival de Mario. Es el polo opuesto a nuestro héroe, motivado por la codicia y el ajo.", tag: "WarioWare" },
    { id: 'zelda', name: 'Zelda', imgSrc: './img/zelda.avif', sound: './sound/notificacion.mp3', description: "La sabia y poderosa princesa de Hyrule, portadora de la Trifuerza de la Sabiduría.", tag: "The Legend of Zelda" },
    { id: 'link', name: 'Link', imgSrc: './img/carrusel2.avif', sound: './sound/notificacion.mp3', description: "El valiente héroe elegido por la Diosa Hylia, destinado a proteger Hyrule de las fuerzas del mal.", tag: "The Legend of Zelda" }
  ];

  const newsData = [
    { imgSrc: './img/zelda.avif', tag: 'Nintendo Direct', tagClass: 'tag-direct', title: 'Resumen del Nintendo Direct de Junio 2024', text: 'Un vistazo a todos los anuncios, desde Metroid Prime 4: Beyond hasta The Legend of Zelda: Echoes of Wisdom.' },
    { imgSrc: './img/futbol.avif', tag: 'eSports', tagClass: 'tag-esports', title: '¡El campeonato de Splatoon 3 llega a Nintendo Live!', text: 'Los mejores equipos compiten por la gloria en el torneo más colorido del año. ¡Entérate de los detalles!' },
    { imgSrc: './img/pokemon3.avif', tag: 'Actualización', tagClass: 'tag-update', title: 'Nuevos eventos de Tera-Incursiones en Pokémon', text: 'Prepara a tu equipo para enfrentarte a nuevos y poderosos Pokémon Paradoja en eventos por tiempo limitado.' }
  ];

  const productContainer = document.getElementById('productContainer');
  const pokemonContainer = document.getElementById('pokemon-cards-container');
  const characterContainer = document.getElementById('character-container');
  const newsContainer = document.getElementById('news-container');
  const cartCountElement = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const totalPriceElement = document.getElementById('totalPrice');
  const clearCartButton = document.getElementById('clearCart');

  // --- Variables para el carrusel de personajes ---
  let characterCurrentPage = 0;
  const charactersPerPage = 4;

  // ========================================
  //  2. RENDERIZADO DINÁMICO
  // ========================================

  function renderItems(container, items, renderer) {
    if (!container) return;
    container.innerHTML = items.map(renderer).join('');
  }

  const productRenderer = (p) => `
    <div class="product-card fade-in-up">
      <img src="${p.imgSrc}" alt="${p.title}">
      <h3 class="product-title">${p.title}</h3>
      <p class="text-light">${p.description}</p>
      <p class="product-price">${p.price.toFixed(2)}</p>
      <button class="btn btn-primary add-to-cart-btn">🛒 Agregar al carrito</button>
    </div>`;

  const pokemonRenderer = (p) => `
    <div class="pokemon-card ${p.cardClass} fade-in-up">
      <img src="${p.imgSrc}" class="card-img-top" alt="${p.title}">
      <div class="card-body text-center p-4">
        <h5 class="card-title">${p.title}</h5>
        <p class="card-text">${p.text}</p>
        <a href="#" class="btn btn-primary">${p.demoText}</a>
      </div>
    </div>`;

  const characterRenderer = (c) => `
    <div class="character-card fade-in-up" data-character-id="${c.id}">
      <img src="${c.imgSrc}" alt="${c.name}">
      <div class="character-name-plate"><span>${c.name}</span></div>
    </div>`;

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
    
  // --- Lógica del carrusel de personajes ---
  const characterPrevBtn = document.getElementById('character-prev-btn');
  const characterNextBtn = document.getElementById('character-next-btn');

  function renderCharacterCarousel() {
    if (!characterContainer) return;

    const totalPages = Math.ceil(characterData.length / charactersPerPage);
    const startIndex = characterCurrentPage * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    const charactersToShow = characterData.slice(startIndex, endIndex);
    
    renderItems(characterContainer, charactersToShow, characterRenderer);

    characterPrevBtn.disabled = characterCurrentPage === 0;
    characterNextBtn.disabled = characterCurrentPage >= totalPages - 1;
  }

  // ========================================
  //  3. LÓGICA DEL CARRITO (UI OFFCANVAS)
  // ========================================
  
  function updateOffcanvasUI() {
    cart = CartLogic.getCart();
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="text-center p-5"><p>Tu carrito está vacío.</p></div>';
      totalPriceElement.textContent = '$0.00';
      return;
    }
    
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const cartItemHTML = `
        <div class="d-flex align-items-center mb-3 p-2 rounded" style="background-color: rgba(255,255,255,0.05);">
          <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3 object-fit-cover">
          <div class="flex-grow-1">
            <p class="mb-0 fw-bold">${item.name}</p>
            <p class="mb-1 text-muted">${item.price.toFixed(2)}</p>
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
    
    totalPriceElement.textContent = `${total.toFixed(2)}`;
  }

  // ========================================
  //  4. MANEJO DE EVENTOS
  // ========================================

  if (productContainer) {
    productContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const priceText = productCard.querySelector('.product-price').textContent;
        
        const product = {
          id: productName.replace(/\s+/g, '-').toLowerCase(),
          name: productName,
          price: parseFloat(priceText.replace(/[^0-9.]/g, '')),
          image: productCard.querySelector('img').src
        };
        
        cart = CartLogic.addToCart(product);
        updateOffcanvasUI();
        showNotification(product.name, product.image);
      }
    });
  }

  cartItemsContainer.addEventListener('click', (e) => {
    const target = e.target;
    const productId = target.closest('[data-id]')?.dataset.id;
    if (!productId) return;

    if (target.classList.contains('remove-btn')) { 
      cart = CartLogic.removeFromCart(productId); 
    }
    
    if (target.classList.contains('quantity-btn')) { 
      cart = CartLogic.changeQuantity(productId, target.dataset.action); 
    }
    
    updateOffcanvasUI();
  });

  clearCartButton.addEventListener('click', () => {
    cart = CartLogic.clearCart();
    updateOffcanvasUI();
  });

  if (characterContainer) {
      characterContainer.addEventListener('click', (e) => {
          const card = e.target.closest('.character-card');
          if (!card) return;
          
          const charId = card.dataset.characterId;
          const char = characterData.find(c => c.id === charId);
          if (!char) return;
          
          playCharacterSound(char.sound);
          createClickParticles(card);
          showCharacterModal(char);
      });
  }

  characterPrevBtn?.addEventListener('click', () => {
    if (characterCurrentPage > 0) {
      characterCurrentPage--;
      renderCharacterCarousel();
    }
  });

  characterNextBtn?.addEventListener('click', () => {
    const totalPages = Math.ceil(characterData.length / charactersPerPage);
    if (characterCurrentPage < totalPages - 1) {
      characterCurrentPage++;
      renderCharacterCarousel();
    }
  });

  // ========================================
  //  5. MODALES Y NOTIFICACIONES
  // ========================================

  function showNotification(productName, productImage) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <img src="${productImage}" alt="${productName}">
      <div class="toast-notification-content">
        <p>${productName}</p>
        <span>Se agregó a tu carrito.</span>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => { toast.classList.add('show'); });
    
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
  }

  const characterModal = document.getElementById('characterModal');
  
  function showCharacterModal(character) {
      if (!characterModal) return;
      
      const characterModalBody = document.getElementById('characterModalBody');
      characterModalBody.innerHTML = `
          <img src="${character.imgSrc}" class="character-modal-img" alt="${character.name}">
          <h2 class="character-modal-title">${character.name}</h2>
          <p class="character-modal-description">${character.description}</p>
          <span class="character-modal-tag">${character.tag}</span>`;
      
      characterModal.style.display = 'flex';
      characterModal.querySelector('.modal-content-modern').classList.add('show');
  }
  
  function closeCharacterModalFunction() {
      const modalContent = characterModal.querySelector('.modal-content-modern');
      modalContent.classList.remove('show');
      setTimeout(() => { characterModal.style.display = 'none'; }, 300);
  }
  
  document.getElementById('closeCharacterModal')?.addEventListener('click', closeCharacterModalFunction);
  characterModal?.addEventListener('click', (e) => {
    if (e.target === characterModal) closeCharacterModalFunction();
  });

  // ========================================
  //  6. OTRAS FUNCIONALIDADES
  // ========================================
  // Sección reservada para funcionalidades adicionales futuras

  // ========================================
  //  7. EJECUCIÓN INICIAL
  // ========================================

  renderItems(productContainer, popularProductsData, productRenderer);
  renderItems(pokemonContainer, pokemonData, pokemonRenderer);
  renderCharacterCarousel(); // <--- Changed this line
  renderItems(newsContainer, newsData, newsRenderer);
  
  updateOffcanvasUI();
  
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