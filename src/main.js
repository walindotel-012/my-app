// Importaciones principales
import "./assets/style.css"
import { router } from "./router/router.js"
import { initNavbar } from "./components/navbar.js"
import { initFooter } from "./components/footer.js"

/**
 * Funcion principal que inicializa la aplicacion SPA
 * Se ejecuta cuando el DOM esta completamente cargado
 */
function initApp() {
  console.log("[My Store] Inicializando aplicacion SPA")

  // Inicializar componentes globales
  initNavbar()
  initFooter()

  // Inicializar el router para manejar las rutas
  router.init()

  // Manejar eventos de navegacion del navegador (botones atras/adelante)
  window.addEventListener("popstate", () => {
    router.handleRoute()
  })

  console.log("[My Store] Aplicacion inicializada correctamente")
}

// Esperar a que el DOM este completamente cargado
document.addEventListener("DOMContentLoaded", initApp)
