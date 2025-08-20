/**
 * theme.js
 * Contiene la lógica para aplicar el tema oscuro/claro y manejar la preferencia del usuario.
 */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  /**
   * Aplica un tema (claro u oscuro) al body y actualiza el ícono.
   * @param {string} theme - El tema a aplicar ('light' o 'dark').
   * @param {boolean} isInitial - True si es la carga inicial para evitar transiciones.
   */
  function applyTheme(theme, isInitial = false) {
    body.classList.toggle('light-mode', theme === 'light');
    
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.classList.toggle('bi-nintendo-switch', theme === 'dark');
      icon.classList.toggle('bi-brightness-high-fill', theme === 'light');
    }

    if (!isInitial) {
      body.style.transition = 'background 0.5s ease, color 0.5s ease';
    }
  }

  // Cargar el tema guardado al iniciar la página
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme, true);

  // Añadir el listener al botón de cambio de tema, si existe en la página
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light-mode');
      const newTheme = isLight ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }
});
