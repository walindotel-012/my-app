/**
 * Página de catálogo
 * Muestra todos los productos con funcionalidad de búsqueda y filtros
 */

import { createProductCard } from "../components/productCard.js"

/**
 * Clase para la página de catálogo
 */
export class CatalogPage {
  constructor() {
    this.products = []
    this.filteredProducts = []
    this.categories = []
    this.currentCategory = "all"
    this.currentSearch = ""
    this.isLoading = false
  }

  /**
   * Renderiza la página de catálogo
   * @returns {Promise<string>} HTML de la página
   */
  async render() {
    try {
      // Cargar productos y categorías
      await this.loadProducts()
      await this.loadCategories()

      // Aplicar filtros iniciales
      this.applyFilters()

      return `
        <div class="fade-in relative min-h-screen">
          <!-- Header fijo -->
          <div class="fixed top-0 left-0 right-0 z-10">
            ${this.renderHeader()}
            <!-- Contenedor de filtros con fondo blur -->
            <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
              ${this.renderFilters()}
            </div>
          </div>
          
          <!-- Espacio para compensar el header fijo -->
          <div class="h-[180px] sm:h-[160px]"></div>
          
          <!-- Contenido scrolleable -->
          <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            ${this.renderProductGrid()}
          </div>
        </div>
      `
    } catch (error) {
      console.error("❌ Error al renderizar catálogo:", error)
      return this.renderError()
    }
  }

  /**
   * Configura eventos después del render
   */
  afterRender() {
    this.setupSearchEvents()
    this.setupFilterEvents()
    console.log("✅ Eventos del catálogo configurados")
  }

  /**
   * Carga todos los productos desde la API
   */
  async loadProducts() {
    if (this.isLoading) return

    try {
      this.isLoading = true
      console.log("🔄 Cargando productos del catálogo...")

      const response = await fetch("https://fakestoreapi.com/products")

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      this.products = await response.json()

      console.log("✅ Productos cargados:", this.products.length)
    } catch (error) {
      console.error("❌ Error al cargar productos:", error)
      this.products = []
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Carga las categorías disponibles
   */
  async loadCategories() {
    try {
      console.log("🔄 Cargando categorías...")

      const response = await fetch("https://fakestoreapi.com/products/categories")

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      this.categories = await response.json()

      console.log("✅ Categorías cargadas:", this.categories)
    } catch (error) {
      console.error("❌ Error al cargar categorías:", error)
      this.categories = []
    }
  }

  /**
   * Renderiza el header del catálogo
   * @returns {string} HTML del header
   */
  renderHeader() {
    return `
      <section class="bg-white border-b border-gray-200 py-8">
        <div class="container mx-auto px-4">
          <div class="text-center">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Catálogo de Productos
            </h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora nuestra amplia selección de productos de alta calidad
            </p>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza los filtros de búsqueda y categorías
   * @returns {string} HTML de los filtros
   */
  renderFilters() {
    return `
      <section class="bg-gray-50 py-6 sticky top-16 z-40 border-b border-gray-200">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            <!-- Buscador -->
            <div class="w-full lg:w-1/2">
              <div class="relative">
                <input 
                  type="text" 
                  id="search-input"
                  placeholder="Buscar productos..." 
                  class="input-field pl-10 pr-4"
                  value="${this.currentSearch}"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
                <button 
                  id="clear-search"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${this.currentSearch ? "" : "hidden"}"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <!-- Filtros de categoría -->
            <div class="w-full lg:w-auto">
              <div class="flex flex-wrap gap-2 justify-center lg:justify-end">
                <button 
                  class="filter-btn ${this.currentCategory === "all" ? "active" : ""}" 
                  data-category="all"
                >
                  Todas
                </button>
                ${this.categories
                  .map(
                    (category) => `
                  <button 
                    class="filter-btn ${this.currentCategory === category ? "active" : ""}" 
                    data-category="${category}"
                  >
                    ${this.capitalizeFirst(category)}
                  </button>
                `,
                  )
                  .join("")}
              </div>
            </div>
          </div>
          
          <!-- Contador de resultados -->
          <div class="mt-4 text-center lg:text-left">
            <p class="text-gray-600">
              Mostrando <span class="font-semibold">${this.filteredProducts.length}</span> 
              de <span class="font-semibold">${this.products.length}</span> productos
              ${this.currentSearch ? `para "<span class="font-semibold">${this.currentSearch}</span>"` : ""}
              ${this.currentCategory !== "all" ? `en <span class="font-semibold">${this.capitalizeFirst(this.currentCategory)}</span>` : ""}
            </p>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza la grilla de productos
   * @returns {string} HTML de la grilla
   */
  renderProductGrid() {
    if (this.isLoading) {
      return this.renderLoading()
    }

    if (this.filteredProducts.length === 0) {
      return this.renderNoResults()
    }

    return `
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${this.filteredProducts.map((product) => createProductCard(product)).join("")}
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza estado de carga
   * @returns {string} HTML de loading
   */
  renderLoading() {
    return `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${Array(8)
              .fill(0)
              .map(
                () => `
              <div class="card animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-4">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded mb-3"></div>
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-16"></div>
                    <div class="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza mensaje cuando no hay resultados
   * @returns {string} HTML de no resultados
   */
  renderNoResults() {
    return `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
          <p class="text-gray-600 mb-6">
            ${
              this.currentSearch
                ? `No hay productos que coincidan con "${this.currentSearch}"`
                : "No hay productos en esta categoría"
            }
          </p>
          <button 
            onclick="catalogPage.clearFilters()" 
            class="btn-primary"
          >
            Limpiar filtros
          </button>
        </div>
      </section>
    `
  }

  /**
   * Configura eventos de búsqueda
   */
  setupSearchEvents() {
    const searchInput = document.getElementById("search-input")
    const clearButton = document.getElementById("clear-search")

    if (searchInput) {
      // Búsqueda en tiempo real con debounce
      let searchTimeout
      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
          this.currentSearch = e.target.value.trim()
          this.applyFilters()
          this.updateProductGrid()
          this.updateClearButton()
        }, 300)
      })
    }

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        this.currentSearch = ""
        searchInput.value = ""
        this.applyFilters()
        this.updateProductGrid()
        this.updateClearButton()
      })
    }
  }

  /**
   * Configura eventos de filtros
   */
  setupFilterEvents() {
    const filterButtons = document.querySelectorAll(".filter-btn")

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category")

        // Actualizar estado activo
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        // Aplicar filtro
        this.currentCategory = category
        this.applyFilters()
        this.updateProductGrid()
      })
    })
  }

  /**
   * Aplica filtros de búsqueda y categoría
   */
  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      // Filtro por categoría
      const categoryMatch = this.currentCategory === "all" || product.category === this.currentCategory

      // Filtro por búsqueda
      const searchMatch =
        !this.currentSearch ||
        product.title.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(this.currentSearch.toLowerCase())

      return categoryMatch && searchMatch
    })

    console.log(`🔍 Filtros aplicados: ${this.filteredProducts.length} productos`)
  }

  /**
   * Actualiza la grilla de productos sin recargar toda la página
   */
  updateProductGrid() {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      // Re-renderizar solo la sección de filtros y productos
      const filtersSection = mainContent.querySelector("section:nth-child(2)")
      const gridSection = mainContent.querySelector("section:nth-child(3)")

      if (filtersSection) {
        filtersSection.outerHTML = this.renderFilters()
      }

      if (gridSection) {
        gridSection.outerHTML = this.renderProductGrid()
      }

      // Re-configurar eventos
      this.setupSearchEvents()
      this.setupFilterEvents()
    }
  }

  /**
   * Actualiza la visibilidad del botón de limpiar búsqueda
   */
  updateClearButton() {
    const clearButton = document.getElementById("clear-search")
    if (clearButton) {
      clearButton.classList.toggle("hidden", !this.currentSearch)
    }
  }

  /**
   * Limpia todos los filtros
   */
  clearFilters() {
    this.currentSearch = ""
    this.currentCategory = "all"

    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.value = ""
    }

    this.applyFilters()
    this.updateProductGrid()
  }

  /**
   * Capitaliza la primera letra de una cadena
   * @param {string} str - Cadena a capitalizar
   * @returns {string} Cadena capitalizada
   */
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * Renderiza mensaje de error
   * @returns {string} HTML de error
   */
  renderError() {
    return `
      <div class="container mx-auto px-4 py-16 text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error al cargar el catálogo</h2>
        <p class="text-gray-600 mb-4">Ha ocurrido un error al cargar los productos</p>
        <button onclick="location.reload()" class="btn-primary">
          Intentar de nuevo
        </button>
      </div>
    `
  }
}

// Hacer la instancia accesible globalmente para los eventos
window.catalogPage = new CatalogPage()

// Agregar estilos CSS para los botones de filtro
const style = document.createElement("style")
style.textContent = `
  .filter-btn {
    @apply px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200;
  }
  
  .filter-btn.active {
    @apply bg-primary text-white border-primary;
  }
`
document.head.appendChild(style)
