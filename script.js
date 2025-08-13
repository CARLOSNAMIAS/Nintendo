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

});