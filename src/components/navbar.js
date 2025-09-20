/**
 * Componente de barra de navegación
 * Maneja la navegación principal y el menú móvil
 */

/**
 * Inicializa la barra de navegación
 */
export function initNavbar() {
  const navbarContainer = document.getElementById("navbar")

  if (!navbarContainer) {
    console.error("❌ No se encontró el contenedor de la navbar")
    return
  }

  // Renderizar la estructura de la navbar
  navbarContainer.innerHTML = createNavbarHTML()

  // Configurar eventos
  setupNavbarEvents()

  // Actualizar estado activo inicial
  updateActiveNavItem()

  console.log("✅ Navbar inicializada")
}

/**
 * Crea el HTML de la barra de navegación
 * @returns {string} HTML de la navbar
 */
function createNavbarHTML() {
  return `
    <header class="bg-white shadow-md sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <!-- Logo y título -->
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">🛍️</span>
            </div>
            <h1 class="text-xl font-bold text-secondary">My Store</h1>
          </div>
          
          <!-- Navegación desktop -->
          <ul class="hidden md:flex space-x-6">
            <li>
              <a href="/" class="nav-link" data-route="/">
                Inicio
              </a>
            </li>
            <li>
              <a href="/catalog" class="nav-link" data-route="/catalog">
                Catálogo
              </a>
            </li>
          </ul>
          
          <!-- Botón menú móvil -->
          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Menú móvil -->
        <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-gray-200">
          <ul class="space-y-2 pt-4">
            <li>
              <a href="/" class="mobile-nav-link block py-2 px-4 rounded-lg hover:bg-gray-100" data-route="/">
                🏠 Inicio
              </a>
            </li>
            <li>
              <a href="/catalog" class="mobile-nav-link block py-2 px-4 rounded-lg hover:bg-gray-100" data-route="/catalog">
                📦 Catálogo
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `
}

/**
 * Configura los eventos de la navbar
 */
function setupNavbarEvents() {
  // Evento para el botón del menú móvil
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Eventos para los enlaces de navegación
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const route = link.getAttribute("data-route")

      // Cerrar menú móvil si está abierto
      if (mobileMenu) {
        mobileMenu.classList.add("hidden")
      }

      // Navegar a la ruta
      if (window.router) {
        window.router.navigate(route)
      }

      // Actualizar estado activo
      updateActiveNavItem()
    })
  })

  // Cerrar menú móvil al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden")
    }
  })
}

/**
 * Actualiza el elemento de navegación activo
 */
function updateActiveNavItem() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    const route = link.getAttribute("data-route")

    // Remover clases activas
    link.classList.remove("text-primary", "font-semibold", "bg-blue-50")

    // Agregar clases activas si coincide la ruta
    if (route === currentPath || (currentPath.startsWith("/detail") && route === "/catalog")) {
      link.classList.add("text-primary", "font-semibold")

      // Estilo adicional para móvil
      if (link.classList.contains("mobile-nav-link")) {
        link.classList.add("bg-blue-50")
      }
    }
  })
}

// Actualizar navegación activa cuando cambie la ruta
window.addEventListener("popstate", updateActiveNavItem)
