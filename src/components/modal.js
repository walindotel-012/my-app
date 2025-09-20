/**
 * Componente de modal reutilizable
 * Permite mostrar contenido en una ventana modal
 */

/**
 * Clase para manejar modales
 */
export class Modal {
  constructor() {
    this.modalContainer = null
    this.isOpen = false
  }

  /**
   * Muestra un modal con el contenido especificado
   * @param {string} title - Título del modal
   * @param {string} content - Contenido HTML del modal
   * @param {Object} options - Opciones adicionales
   */
  show(title, content, options = {}) {
    const {
      size = "md", // sm, md, lg, xl
      closable = true,
      onClose = null,
    } = options

    // Crear el modal si no existe
    this.createModal(title, content, size, closable, onClose)

    // Mostrar el modal
    this.modalContainer.classList.remove("hidden")
    this.modalContainer.classList.add("flex")

    // Agregar clase al body para prevenir scroll
    document.body.classList.add("overflow-hidden")

    this.isOpen = true

    // Focus en el modal para accesibilidad
    const modalContent = this.modalContainer.querySelector(".modal-content")
    if (modalContent) {
      modalContent.focus()
    }

    console.log("✅ Modal mostrado")
  }

  /**
   * Oculta el modal
   */
  hide() {
    if (!this.modalContainer || !this.isOpen) return

    // Ocultar el modal
    this.modalContainer.classList.add("hidden")
    this.modalContainer.classList.remove("flex")

    // Remover clase del body
    document.body.classList.remove("overflow-hidden")

    this.isOpen = false

    console.log("✅ Modal ocultado")
  }

  /**
   * Crea la estructura del modal
   * @param {string} title - Título del modal
   * @param {string} content - Contenido del modal
   * @param {string} size - Tamaño del modal
   * @param {boolean} closable - Si se puede cerrar
   * @param {Function} onClose - Callback al cerrar
   */
  createModal(title, content, size, closable, onClose) {
    // Obtener o crear contenedor
    this.modalContainer = document.getElementById("modal-container")

    if (!this.modalContainer) {
      console.error("❌ No se encontró el contenedor del modal")
      return
    }

    // Definir clases de tamaño
    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    }

    // Crear HTML del modal
    this.modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4" id="modal-overlay">
        <div class="modal-content bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-screen overflow-y-auto" 
             tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          
          <!-- Header del modal -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" class="text-xl font-semibold text-gray-800">
              ${title}
            </h2>
            
            ${
              closable
                ? `
              <button 
                id="modal-close-btn" 
                class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Cerrar modal"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            `
                : ""
            }
          </div>
          
          <!-- Contenido del modal -->
          <div class="p-6">
            ${content}
          </div>
        </div>
      </div>
    `

    // Configurar eventos
    this.setupModalEvents(closable, onClose)
  }

  /**
   * Configura los eventos del modal
   * @param {boolean} closable - Si se puede cerrar
   * @param {Function} onClose - Callback al cerrar
   */
  setupModalEvents(closable, onClose) {
    if (!closable) return

    const overlay = this.modalContainer.querySelector("#modal-overlay")
    const closeBtn = this.modalContainer.querySelector("#modal-close-btn")
    const modalContent = this.modalContainer.querySelector(".modal-content")

    // Cerrar al hacer clic en el overlay
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.hide()
          if (onClose) onClose()
        }
      })
    }

    // Cerrar con el botón X
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.hide()
        if (onClose) onClose()
      })
    }

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.hide()
        if (onClose) onClose()
      }
    })

    // Prevenir cierre al hacer clic dentro del contenido
    if (modalContent) {
      modalContent.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    }
  }
}

// Crear instancia global del modal
export const modal = new Modal()

// Hacer el modal accesible globalmente
window.modal = modal
