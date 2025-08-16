document.addEventListener('DOMContentLoaded', function () {

  // Animaciones fade-in
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    fadeObserver.observe(el);
  });

  // Variables del carrito
  let cart = [];

  function updateCartUI() {
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsElement = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    cartCountElement.textContent = cart.length;

    if (cart.length === 0) {
      cartItemsElement.innerHTML = '<span class="dropdown-item-text">Carrito vacío</span>';
      totalPriceElement.textContent = 'Total: $0.00';
    } else {
      let total = 0;
      cartItemsElement.innerHTML = '';

      cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
          <div class="dropdown-item d-flex justify-content-between align-items-center">
            <span>${item.name}</span>
            <div>
              <span class="text-success me-2">$${item.price.toFixed(2)}</span>
              <button class="btn btn-sm btn-outline-danger remove-btn" data-index="${index}">×</button>
            </div>
          </div>
        `;
        cartItemsElement.appendChild(cartItem);
      });

      totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartUI();
    showNotification(name, image);
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
  }

  function clearCart() {
    cart = [];
    updateCartUI();
  }

  // Modal
  function showNotification(productName, productImage) {
    const modal = document.getElementById('notificationModal');
    document.getElementById('addedProductTitle').textContent = productName;
    document.getElementById('addedProductImage').src = productImage;
    modal.classList.add('show-modal');
  }

  function closeNotification() {
    document.getElementById('notificationModal').classList.remove('show-modal');
  }

  // Event Listeners
  document.getElementById('cartItems').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      removeFromCart(parseInt(e.target.dataset.index, 10));
    }
  });

  document.getElementById('clearCart')?.addEventListener('click', clearCart);
  document.getElementById('closeModal')?.addEventListener('click', closeNotification);
  document.getElementById('continueShopping')?.addEventListener('click', closeNotification);

  // Botones de productos
  document.querySelectorAll('.product-card .btn-primary').forEach(button => {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const priceText = productCard.querySelector('.product-price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const image = productCard.querySelector('img').src;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(productName, price, image);
    });
  });

  // Parallax solo en banner y sección segura
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.discount-banner').forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  window.addEventListener('scroll', requestTick, { passive: true });

  // Efecto typing
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeWriter(entry.target, entry.target.dataset.originalText, 50);
        typingObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.section-title').forEach(title => {
    title.dataset.originalText = title.textContent;
    typingObserver.observe(title);
  });

  // Partículas
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, var(--nintendo-red), var(--nintendo-yellow));
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.7;
      animation: float 6s linear infinite;
    `;
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 6000);
  }

  let particleInterval = setInterval(createParticle, 3000);

  // Iniciar carrito
  updateCartUI();

  // Theme switcher logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  function applyTheme(theme, isInitial) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');
    } else {
      body.classList.remove('light-mode');
      icon.classList.remove('bi-moon-fill');
      icon.classList.add('bi-sun-fill');
    }
    if (!isInitial) {
        body.style.transition = 'background 0.5s ease, color 0.5s ease';
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme, true);

  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    const newTheme = isLight ? 'dark' : 'light';
    applyTheme(newTheme, false);
    localStorage.setItem('theme', newTheme);
  });




  // Lógica de la galería de personajes
  const characterData = {
    mario: {
      name: "Mario",
      description: "Mario es un fontanero valiente y alegre, conocido por su característico traje rojo y azul. Es el héroe del Reino Champiñón y siempre está listo para rescatar a la Princesa Peach de las garras de Bowser.",
      tag: "Super Mario",
      img: "./img/mario-bros.png"
    },
    luigi: {
      name: "Luigi",
      description: "El hermano menor, más alto y a menudo temeroso de Mario. A pesar de su naturaleza nerviosa, es muy capaz y siempre ayuda cuando es necesario.",
      tag: "Super Mario",
      img: "././img/luigii.png"
    },
    peach: {
      name: "Peach",
      description: "La benevolente y elegante gobernante del Reino Champiñón. A menudo es el objetivo de los planes de secuestro de Bowser.",
      tag: "Super Mario",
      img: "././img/princesaa.png"
    },
    bowser: {
        name: "Bowser",
        description: "El rey de los Koopas, una tortuga gigante con una coraza con púas. Su objetivo principal es conquistar el Reino Champiñón.",
        tag: "Super Mario",
        img: "././img/bower.png"
    },
    wario: {
        name: "wario",
        description: "El valiente héroe de Hyrule, destinado a proteger el reino y a la Princesa Zelda del malvado Ganon. Poseedor de la Trifuerza del Valor.",
        tag: "The Legend of Zelda",
        img: "./img/wario.png"
    },


    // Agrega más personajes aquí
    kirby: {
        name: "Kirby",
        description: "Una adorable criatura rosa del planeta Popstar con la habilidad de inhalar enemigos para copiar sus poderes. Tiene un apetito infinito.",
        tag: "Kirby",
        img: "#"
    }
  };

  const characterModal = document.getElementById('characterModal');
  const characterModalBody = document.getElementById('characterModalBody');
  const closeCharacterModal = document.getElementById('closeCharacterModal');

  document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
      const characterId = card.dataset.character;
      const data = characterData[characterId];

      if (data) {
        characterModalBody.innerHTML = `
          <img src="${data.img}" class="character-modal-img" alt="${data.name}">
          <h2 class="character-modal-title">${data.name}</h2>
          <p class="character-modal-description">${data.description}</p>
          <span class="character-modal-tag">${data.tag}</span>
        `;
        characterModal.style.display = 'flex';
        // Forzar un reflow para aplicar la animación de entrada
        characterModal.querySelector('.modal-content-modern').classList.add('show');
      }
    });
  });

  function closeCharacterModalFunction() {
    const modalContent = characterModal.querySelector('.modal-content-modern');
    modalContent.classList.remove('show');
    // Esperar a que la animación de salida termine para ocultar el overlay
    setTimeout(() => {
        characterModal.style.display = 'none';
    }, 300); // Debe coincidir con la duración de la transición en CSS
  }

  closeCharacterModal.addEventListener('click', closeCharacterModalFunction);

  // Cierra el modal si se hace clic fuera del contenido
  characterModal.addEventListener('click', (e) => {
    if (e.target === characterModal) {
        closeCharacterModalFunction();
    }
  });

});





// 🎆 FUNCIÓN PARA CREAR PARTÍCULAS
function createClickParticles(element) {
    const character = element.dataset.character;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Efecto visual en la tarjeta
    element.classList.add('clicked');
    setTimeout(() => element.classList.remove('clicked'), 400);

    // Colores por personaje
    const colors = {
        mario: ['#E60012', '#FF4444', '#FFD700'],
        luigi: ['#00AA00', '#44FF44', '#90EE90'],
        peach: ['#FF69B4', '#FFB6C1', '#FFC0CB'],
        bowser: ['#8B4513', '#D2691E', '#FF4500'],
        wario: ['#FFD700', '#FFFF00', '#FFA500'],
        kirby: ['#FFB6C1', '#FF69B4', '#FF1493']
    };
    
    const particleColors = colors[character] || ['#FFD700', '#FF69B4'];
    
    // Crear 12 partículas
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        // Posición inicial (centro de la tarjeta)
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        // Calcular dirección
        const angle = (360 / 12) * i + (Math.random() - 0.5) * 45;
        const distance = 60 + Math.random() * 30;
        
        const radians = angle * Math.PI / 180;
        const dx = Math.cos(radians) * distance;
        const dy = Math.sin(radians) * distance;
        
        // Variables CSS para la animación
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        // Color aleatorio
        const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.background = `radial-gradient(circle, ${randomColor}, ${randomColor}aa)`;
        
        // Tamaño aleatorio
        const size = 6 + Math.random() * 8;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        document.body.appendChild(particle);
        
        // Limpiar después de 800ms
        setTimeout(() => particle.remove(), 800);
    }
}

// 🎵 FUNCIÓN MEJORADA PARA SONIDO + PARTÍCULAS
function playCharacterSound(element) {
    // Reproducir sonido original
    const soundPath = element.getAttribute('data-sound');
    if (soundPath) {
        const audio = new Audio(soundPath);
        audio.volume = 0.7;
        audio.play().catch(error => console.log('Error:', error));
    }
    
    // Crear partículas
    createClickParticles(element);
}