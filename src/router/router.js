// Importar las páginas de la aplicación
import { HomePage } from "../pages/home.js"
import { CatalogPage } from "../pages/catalog.js"
import { DetailPage } from "../pages/detail.js"

/**
 * Router simple para manejar las rutas de la SPA
 * Permite navegación sin recargar la página
 */
class Router {
  constructor() {
    // Definir las rutas disponibles y sus componentes correspondientes
    this.routes = {
      "/": HomePage,
      "/catalog": CatalogPage,
      "/detail": DetailPage,
    }

    // Contenedor donde se renderizará el contenido
    this.contentContainer = null
  }

  /**
   * Inicializa el router y configura el contenedor de contenido
   */
  init() {
    this.contentContainer = document.getElementById("main-content")

    if (!this.contentContainer) {
      console.error("❌ No se encontró el contenedor principal")
      return
    }

    // Cargar la ruta inicial
    this.handleRoute()
  }

  /**
   * Maneja el cambio de ruta y renderiza el componente correspondiente
   */
  async handleRoute() {
    // Obtener la ruta actual desde la URL
    const path = window.location.pathname
    const urlParams = new URLSearchParams(window.location.search)

    console.log(`🔄 Navegando a: ${path}`)

    // Buscar el componente correspondiente a la ruta
    let RouteComponent = this.routes[path]

    // Si no existe la ruta exacta, verificar rutas especiales
    if (!RouteComponent) {
      if (path.startsWith("/detail")) {
        RouteComponent = this.routes["/detail"]
      } else {
        // Ruta no encontrada, redirigir al inicio
        console.warn(`⚠️ Ruta no encontrada: ${path}, redirigiendo al inicio`)
        this.navigate("/")
        return
      }
    }

    try {
      // Mostrar indicador de carga
      this.showLoading()

      // Crear instancia del componente y renderizarlo
      const componentInstance = new RouteComponent()
      const content = await componentInstance.render(urlParams)

      // Actualizar el contenido del contenedor
      this.contentContainer.innerHTML = content

      // Ejecutar eventos post-render si existen
      if (componentInstance.afterRender) {
        componentInstance.afterRender()
      }

      // Scroll al inicio de la página
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("❌ Error al cargar la página:", error)
      this.showError()
    }
  }

  /**
   * Navega a una nueva ruta sin recargar la página
   * @param {string} path - Ruta de destino
   * @param {Object} params - Parámetros de consulta opcionales
   */
  navigate(path, params = {}) {
    // Construir URL con parámetros
    const url = new URL(path, window.location.origin)
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key])
    })

    // Actualizar la URL del navegador sin recargar
    window.history.pushState({}, "", url.toString())

    // Manejar la nueva ruta
    this.handleRoute()
  }

  /**
   * Muestra un indicador de carga
   */
  showLoading() {
    this.contentContainer.innerHTML = `
      <div class="flex justify-center items-center min-h-96">
        <div class="text-center">
          <div class="loader mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando...</p>
        </div>
      </div>
    `
  }

  /**
   * Muestra un mensaje de error
   */
  showError() {
    this.contentContainer.innerHTML = `
      <div class="flex justify-center items-center min-h-96">
        <div class="text-center">
          <div class="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Error al cargar la página</h2>
          <p class="text-gray-600 mb-4">Ha ocurrido un error inesperado</p>
          <button onclick="router.navigate('/')" class="btn-primary">
            Volver al inicio
          </button>
        </div>
      </div>
    `
  }
}

// Crear instancia global del router
export const router = new Router()

// Hacer el router accesible globalmente para uso en HTML
window.router = router
