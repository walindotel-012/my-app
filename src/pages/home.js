/**
 * Página de inicio
 * Muestra hero section, productos destacados y características
 */

/**
 * Clase para la página de inicio
 */
export class HomePage {
  constructor() {
    this.featuredProducts = []
  }

  /**
   * Renderiza la página de inicio
   * @returns {Promise<string>} HTML de la página
   */
  async render() {
    try {
      // Cargar productos destacados
      await this.loadFeaturedProducts()

      return `
        <div class="fade-in">
          ${this.renderHeroSection()}
          ${this.renderFeaturesSection()}
          ${this.renderFeaturedProducts()}
          ${this.renderCallToAction()}
        </div>
      `
    } catch (error) {
      console.error("❌ Error al renderizar página de inicio:", error)
      return this.renderError()
    }
  }

  /**
   * Carga productos destacados desde la API
   */
  async loadFeaturedProducts() {
    try {
      console.log("🔄 Cargando productos destacados...")

      const response = await fetch("https://fakestoreapi.com/products?limit=4")

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      this.featuredProducts = await response.json()

      console.log("✅ Productos destacados cargados:", this.featuredProducts.length)
    } catch (error) {
      console.error("❌ Error al cargar productos destacados:", error)
      this.featuredProducts = []
    }
  }

  /**
   * Renderiza la sección hero
   * @returns {string} HTML del hero
   */
  renderHeroSection() {
    return `
      <section class="relative bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white py-24 overflow-hidden">
        <!-- Patrón de fondo con opacidad -->
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <!-- Efecto de resplandor -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight slide-up">
              Bienvenido a 
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                My Store
              </span>
            </h1>
            
            <p class="text-lg sm:text-xl lg:text-2xl mb-10 text-gray-300 leading-relaxed slide-up max-w-3xl mx-auto" style="animation-delay: 0.2s">
              Descubre productos increíbles con análisis inteligente de comentarios y la mejor experiencia de compra online
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center slide-up" style="animation-delay: 0.4s">
              <button 
                onclick="router.navigate('/catalog')" 
                class="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <span>Explorar Catálogo</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
              
              <button 
                onclick="scrollToSection('features')" 
                class="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                <span>Conocer Más</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza la sección de características
   * @returns {string} HTML de características
   */
  renderFeaturesSection() {
    const features = [
      {
        icon: `<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>`,
        title: "Amplio Catálogo",
        description: "Miles de productos cuidadosamente seleccionados para satisfacer todas tus necesidades",
      },
      {
        icon: `<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>`,
        title: "IA Integrada",
        description: "Análisis inteligente de opiniones que te ayuda a tomar mejores decisiones de compra",
      },
      {
        icon: `<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>`,
        title: "Diseño Responsive",
        description: "Una experiencia de compra perfecta en cualquier dispositivo, adaptada a tus necesidades",
      },
      {
        icon: `<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>`,
        title: "Carga Rápida",
        description: "Navegación fluida y sin interrupciones gracias a nuestra tecnología optimizada",
      },
    ]

    return `
      <section id="features" class="py-24 bg-slate-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
              Características Principales
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              ¿Por qué elegir My Store?
            </h2>
            <p class="text-lg sm:text-xl text-slate-600 leading-relaxed">
              Combinamos tecnología avanzada con una experiencia de usuario excepcional para brindarte lo mejor del comercio electrónico
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            ${features
              .map(
                (feature) => `
              <div class="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <!-- Icono con círculo de fondo -->
                <div class="relative inline-flex mb-6">
                  <div class="absolute inset-0 rounded-full bg-blue-100 transform transition-transform group-hover:scale-110"></div>
                  <div class="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    ${feature.icon}
                  </div>
                </div>
                
                <!-- Título y descripción -->
                <h3 class="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  ${feature.title}
                </h3>
                <p class="text-slate-600 leading-relaxed">
                  ${feature.description}
                </p>
                
                <!-- Flecha indicadora en hover -->
                <div class="absolute bottom-8 right-8 opacity-0 transform translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
          
          <!-- Separador decorativo -->
          <div class="max-w-3xl mx-auto mt-20 pt-12 border-t border-gray-200">
            <div class="flex justify-center space-x-6">
              <p class="text-sm text-gray-500 flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Envío gratis en compras mayores a $50
              </p>
              <p class="text-sm text-gray-500 flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                Garantía de devolución de 30 días
              </p>
            </div>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza la sección de productos destacados
   * @returns {string} HTML de productos destacados
   */
  renderFeaturedProducts() {
    if (this.featuredProducts.length === 0) {
      return `
        <section class="py-16">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Productos Destacados</h2>
            <div class="flex justify-center">
              <div class="loader"></div>
            </div>
          </div>
        </section>
      `
    }

    return `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Productos Destacados
            </h2>
            <p class="text-xl text-gray-600">
              Los productos más populares seleccionados especialmente para ti
            </p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${this.featuredProducts.map((product) => this.renderProductCard(product)).join("")}
          </div>
          
          <div class="text-center">
            <button 
              onclick="router.navigate('/catalog')" 
              class="btn-primary px-8 py-3 text-lg"
            >
              Ver Todos los Productos
            </button>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza una tarjeta de producto simplificada
   * @param {Object} product - Datos del producto
   * @returns {string} HTML de la tarjeta
   */
  renderProductCard(product) {
    const truncatedTitle = product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title

    return `
      <div class="card cursor-pointer hover:scale-105 transition-transform duration-200" 
           onclick="router.navigate('/detail', { id: ${product.id} })">
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img 
            src="${product.image}" 
            alt="${product.title}"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 mb-2" title="${product.title}">
            ${truncatedTitle}
          </h3>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-primary">
              $${product.price}
            </span>
            <div class="flex items-center text-sm text-gray-500">
              <span class="text-yellow-400 mr-1">⭐</span>
              ${product.rating.rate}
            </div>
          </div>
        </div>
      </div>
    `
  }

  /**
   * Renderiza la sección de llamada a la acción
   * @returns {string} HTML del CTA
   */
  renderCallToAction() {
    return `
      <section class="relative py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white overflow-hidden">
        <!-- Efecto de resplandor -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
        
        <!-- Patrón de fondo con opacidad -->
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center max-w-3xl mx-auto">
            <span class="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
              Únete a Nosotros
            </span>
            
            <h2 class="text-4xl sm:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
              ¿Listo para comenzar?
            </h2>
            
            <p class="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
              Únete a miles de usuarios que ya disfrutan de la mejor experiencia de compra online
            </p>
            
            <button 
              onclick="router.navigate('/catalog')" 
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <span>Comenzar a Comprar</span>
              <svg class="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza mensaje de error
   * @returns {string} HTML de error
   */
  renderError() {
    return `
      <div class="container mx-auto px-4 py-16 text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error al cargar la página</h2>
        <p class="text-gray-600 mb-4">Ha ocurrido un error al cargar el contenido</p>
        <button onclick="location.reload()" class="btn-primary">
          Intentar de nuevo
        </button>
      </div>
    `
  }
}

// Función global para scroll suave a secciones
window.scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}
