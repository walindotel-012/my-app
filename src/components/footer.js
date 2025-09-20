/**
 * Componente de pie de página
 * Muestra información de la empresa y enlaces útiles
 */

/**
 * Inicializa el pie de página
 */
export function initFooter() {
  const footerContainer = document.getElementById("footer")

  if (!footerContainer) {
    console.error("❌ No se encontró el contenedor del footer")
    return
  }

  // Renderizar el footer
  footerContainer.innerHTML = createFooterHTML()

  console.log("✅ Footer inicializado")
}

/**
 * Crea el HTML del pie de página
 * @returns {string} HTML del footer
 */
function createFooterHTML() {
  const currentYear = new Date().getFullYear()

  return `
    <footer class="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 mt-16 border-t border-gray-700">
      <div class="container mx-auto px-4 py-12 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
          <!-- Información de la empresa -->
          <div class="col-span-1 md:col-span-2 lg:col-span-1">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">🛍️</span>
              </div>
              <h3 class="text-2xl font-bold text-white">My Store</h3>
            </div>
            <p class="text-gray-300 mb-6 text-base leading-relaxed">
              Tu tienda online de confianza con productos de calidad y análisis inteligente de comentarios.
            </p>
            <div class="flex space-x-5">
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <span class="sr-only">Facebook</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,0H5.23C2.34,0,0,2.34,0,5.23v13.54C0,21.66,2.34,24,5.23,24h13.54C21.66,24,24,21.66,24,18.77V5.23C24,2.34,21.66,0,18.77,0z M20,18.77 C20,19.45,19.45,20,18.77,20H15V12.89h2.89l0.43-3.33H15V7.78c0-0.96,0.27-1.62,1.66-1.62h1.77V3.11c-0.31-0.04-1.37-0.13-2.61-0.13 c-2.58,0-4.35,1.58-4.35,4.47v2.5H8.89v3.33h2.58V20H5.23C4.55,20,4,19.45,4,18.77V5.23C4,4.55,4.55,4,5.23,4h13.54 C19.45,4,20,4.55,20,5.23V18.77z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <span class="sr-only">Twitter</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Enlaces rápidos -->
          <div>
            <h4 class="text-xl font-semibold mb-6 text-white">Enlaces Rápidos</h4>
            <ul class="space-y-3">
              <li>
                <a href="/" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalog" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                  </svg>
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Información de contacto -->
          <div>
            <h4 class="text-xl font-semibold mb-6 text-white">Contacto</h4>
            <div class="space-y-4">
              <p class="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                info@mystore.com
              </p>
              <p class="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +1 (555) 123-4567
              </p>
              <p class="flex items-center">
                <span class="mr-2">📍</span>
                123 Commerce St, City, State 12345
              </p>
            </div>
          </div>
        </div>
        
        <!-- Línea divisoria y copyright -->
        <div class="border-t border-gray-600 mt-8 pt-8 text-center">
          <p class="text-gray-300">
            © ${currentYear} My Store. Todos los derechos reservados. 
            <span class="text-sm">Desarrollado con ❤️ y JavaScript vanilla</span>
          </p>
        </div>
      </div>
    </footer>
  `
}
