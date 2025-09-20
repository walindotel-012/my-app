/**
 * Página de detalle de producto
 * Muestra información completa del producto y comentarios con análisis de IA
 */

import { modal } from "../components/modal.js"
import { analyzeSentiment } from "../ai/sentiment.js"

/**
 * Clase para la página de detalle de producto
 */
export class DetailPage {
  constructor() {
    this.product = null
    this.productId = null
    this.comments = []
    this.isLoading = false
  }

  /**
   * Renderiza la página de detalle
   * @param {URLSearchParams} params - Parámetros de la URL
   * @returns {Promise<string>} HTML de la página
   */
  async render(params) {
    try {
      // Obtener ID del producto desde los parámetros
      this.productId = params.get("id")

      if (!this.productId) {
        return this.renderError("ID de producto no válido")
      }

      // Cargar datos del producto
      await this.loadProduct()

      if (!this.product) {
        return this.renderError("Producto no encontrado")
      }

      // Generar comentarios de ejemplo
      this.generateSampleComments()

      return `
        <div class="fade-in">
          ${this.renderBreadcrumb()}
          ${this.renderProductDetail()}
          ${this.renderCommentsSection()}
        </div>
      `
    } catch (error) {
      console.error("❌ Error al renderizar detalle del producto:", error)
      return this.renderError("Error al cargar el producto")
    }
  }

  /**
   * Configura eventos después del render
   */
  afterRender() {
    this.setupImageGallery()
    this.setupCommentForm()
    this.setupQuantityControls()
    this.analyzeExistingComments()
    console.log("✅ Eventos del detalle configurados")
  }

  /**
   * Carga los datos del producto desde la API
   */
  async loadProduct() {
    if (this.isLoading) return

    try {
      this.isLoading = true
      console.log(`🔄 Cargando producto ${this.productId}...`)

      const response = await fetch(`https://fakestoreapi.com/products/${this.productId}`)

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      this.product = await response.json()

      console.log("✅ Producto cargado:", this.product.title)
    } catch (error) {
      console.error("❌ Error al cargar producto:", error)
      this.product = null
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Renderiza el breadcrumb de navegación
   * @returns {string} HTML del breadcrumb
   */
  renderBreadcrumb() {
    return `
      <nav class="bg-gray-50 py-4 border-b border-gray-200">
        <div class="container mx-auto px-4">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" onclick="event.preventDefault(); router.navigate('/')" 
                 class="text-primary hover:text-blue-600">
                Inicio
              </a>
            </li>
            <li class="text-gray-400">›</li>
            <li>
              <a href="/catalog" onclick="event.preventDefault(); router.navigate('/catalog')" 
                 class="text-primary hover:text-blue-600">
                Catálogo
              </a>
            </li>
            <li class="text-gray-400">›</li>
            <li class="text-gray-600 font-medium">
              ${this.product?.category || "Producto"}
            </li>
            <li class="text-gray-400">›</li>
            <li class="text-gray-800 font-semibold truncate max-w-xs">
              ${this.product?.title || "Cargando..."}
            </li>
          </ol>
        </div>
      </nav>
    `
  }

  /**
   * Renderiza el detalle completo del producto
   * @returns {string} HTML del detalle
   */
  renderProductDetail() {
    if (!this.product) {
      return this.renderProductSkeleton()
    }

    return `
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Galería de imágenes -->
            <div class="space-y-4">
              <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  id="main-image"
                  src="${this.product.image}" 
                  alt="${this.product.title}"
                  class="w-full h-full object-contain cursor-zoom-in"
                  onclick="this.requestFullscreen()"
                />
              </div>
              
              <!-- Thumbnails (simulados) -->
              <div class="flex space-x-2 overflow-x-auto">
                ${Array(4)
                  .fill(0)
                  .map(
                    (_, index) => `
                  <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary">
                    <img 
                      src="${this.product.image}" 
                      alt="Vista ${index + 1}"
                      class="w-full h-full object-contain"
                      onclick="document.getElementById('main-image').src = this.src"
                    />
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
            
            <!-- Información del producto -->
            <div class="space-y-6">
              <!-- Título y categoría -->
              <div>
                <div class="flex items-center space-x-2 mb-2">
                  <span class="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    ${this.product.category}
                  </span>
                  <div class="flex items-center text-sm text-gray-500">
                    ${this.generateStars(this.product.rating.rate)}
                    <span class="ml-2">(${this.product.rating.count} reseñas)</span>
                  </div>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">
                  ${this.product.title}
                </h1>
              </div>
              
              <!-- Precio -->
              <div class="border-b border-gray-200 pb-6">
                <div class="flex items-center space-x-4">
                  <span class="text-4xl font-bold text-primary">
                    $${this.product.price}
                  </span>
                  <span class="text-lg text-gray-500 line-through">
                    $${(this.product.price * 1.2).toFixed(2)}
                  </span>
                  <span class="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                    17% OFF
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  Precio incluye impuestos. Envío gratis en compras superiores a $50
                </p>
              </div>
              
              <!-- Descripción -->
              <div class="border-b border-gray-200 pb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Descripción</h3>
                <p class="text-gray-600 leading-relaxed">
                  ${this.product.description}
                </p>
              </div>
              
              <!-- Controles de compra -->
              <div class="space-y-4">
                <!-- Cantidad -->
                <div class="flex items-center space-x-4">
                  <label class="text-sm font-medium text-gray-700">Cantidad:</label>
                  <div class="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      id="decrease-qty" 
                      class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      id="quantity" 
                      value="1" 
                      min="1" 
                      max="10"
                      class="w-16 text-center border-0 focus:ring-0"
                    />
                    <button 
                      id="increase-qty" 
                      class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <!-- Botones de acción -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <button 
                    onclick="this.addToCart()" 
                    class="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    🛒 Agregar al Carrito
                  </button>
                  <button 
                    onclick="this.buyNow()" 
                    class="flex-1 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    ⚡ Comprar Ahora
                  </button>
                </div>
                
                <!-- Información adicional -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div class="flex items-center">
                    <span class="mr-2">🚚</span>
                    Envío gratis en 2-3 días
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">🔄</span>
                    Devoluciones gratuitas
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">🛡️</span>
                    Garantía de 1 año
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">💳</span>
                    Pago seguro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza la sección de comentarios con análisis de IA
   * @returns {string} HTML de comentarios
   */
  renderCommentsSection() {
    return `
      <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            
            <!-- Header de comentarios -->
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-2">
                Comentarios y Reseñas
              </h2>
              <p class="text-gray-600">
                Análisis inteligente de sentimientos con IA 🤖
              </p>
            </div>
            
            <!-- Formulario para nuevo comentario -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Deja tu comentario
              </h3>
              <form id="comment-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    id="comment-name" 
                    placeholder="Tu nombre" 
                    class="input-field"
                    required
                  />
                  <select id="comment-rating" class="input-field" required>
                    <option value="">Calificación</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                    <option value="4">⭐⭐⭐⭐ Muy bueno</option>
                    <option value="3">⭐⭐⭐ Bueno</option>
                    <option value="2">⭐⭐ Regular</option>
                    <option value="1">⭐ Malo</option>
                  </select>
                </div>
                <textarea 
                  id="comment-text" 
                  placeholder="Escribe tu comentario aquí..." 
                  rows="4" 
                  class="input-field resize-none"
                  required
                ></textarea>
                <div class="flex justify-end">
                  <button type="submit" class="btn-primary">
                    Publicar Comentario
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Lista de comentarios -->
            <div id="comments-list" class="space-y-6">
              ${this.comments.map((comment) => this.renderComment(comment)).join("")}
            </div>
            
            ${
              this.comments.length === 0
                ? `
              <div class="text-center py-8">
                <div class="text-4xl mb-4">💬</div>
                <p class="text-gray-600">Sé el primero en comentar este producto</p>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza un comentario individual
   * @param {Object} comment - Datos del comentario
   * @returns {string} HTML del comentario
   */
  renderComment(comment) {
    const sentimentClass = this.getSentimentClass(comment.sentiment)
    const sentimentIcon = this.getSentimentIcon(comment.sentiment)

    return `
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              ${comment.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">${comment.name}</h4>
              <div class="flex items-center space-x-2">
                <div class="flex">
                  ${this.generateStars(comment.rating)}
                </div>
                <span class="text-sm text-gray-500">
                  ${comment.date}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Análisis de sentimiento -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">IA:</span>
            <div class="flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${sentimentClass}">
              <span>${sentimentIcon}</span>
              <span class="font-medium">${comment.sentiment}</span>
              <span>(${Math.round(comment.confidence * 100)}%)</span>
            </div>
          </div>
        </div>
        
        <p class="text-gray-700 leading-relaxed">
          ${comment.text}
        </p>
        
        <!-- Acciones del comentario -->
        <div class="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <button class="text-sm text-gray-500 hover:text-primary flex items-center space-x-1">
            <span>👍</span>
            <span>Útil (${comment.helpful || 0})</span>
          </button>
          <button class="text-sm text-gray-500 hover:text-primary">
            Responder
          </button>
        </div>
      </div>
    `
  }

  /**
   * Genera comentarios de ejemplo para demostración
   */
  generateSampleComments() {
    const sampleComments = [
      {
        name: "María González",
        rating: 5,
        text: "¡Excelente producto! La calidad es increíble y llegó muy rápido. Totalmente recomendado.",
        date: "Hace 2 días",
        helpful: 12,
      },
      {
        name: "Carlos Rodríguez",
        rating: 4,
        text: "Muy buen producto, aunque el precio podría ser un poco mejor. La calidad es buena.",
        date: "Hace 1 semana",
        helpful: 8,
      },
      {
        name: "Ana Martínez",
        rating: 2,
        text: "No estoy muy satisfecha con la compra. El producto no cumplió mis expectativas.",
        date: "Hace 2 semanas",
        helpful: 3,
      },
    ]

    this.comments = sampleComments.map((comment) => ({
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      sentiment: "Analizando...",
      confidence: 0,
    }))
  }

  /**
   * Analiza el sentimiento de los comentarios existentes
   */
  async analyzeExistingComments() {
    console.log("🤖 Analizando sentimientos de comentarios existentes...")

    for (const comment of this.comments) {
      try {
        const analysis = await analyzeSentiment(comment.text)
        comment.sentiment = analysis.sentiment
        comment.confidence = analysis.confidence

        // Actualizar el comentario en el DOM
        this.updateCommentSentiment(comment)
      } catch (error) {
        console.error("❌ Error al analizar sentimiento:", error)
        comment.sentiment = "Error"
        comment.confidence = 0
      }
    }
  }

  /**
   * Actualiza el análisis de sentimiento de un comentario en el DOM
   * @param {Object} comment - Comentario actualizado
   */
  updateCommentSentiment(comment) {
    const commentsList = document.getElementById("comments-list")
    if (commentsList) {
      // Re-renderizar la lista de comentarios
      commentsList.innerHTML = this.comments.map((c) => this.renderComment(c)).join("")
    }
  }

  /**
   * Configura el formulario de comentarios
   */
  setupCommentForm() {
    const form = document.getElementById("comment-form")

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const name = document.getElementById("comment-name").value
        const rating = Number.parseInt(document.getElementById("comment-rating").value)
        const text = document.getElementById("comment-text").value

        if (!name || !rating || !text) {
          alert("Por favor completa todos los campos")
          return
        }

        // Crear nuevo comentario
        const newComment = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          rating,
          text,
          date: "Ahora",
          helpful: 0,
          sentiment: "Analizando...",
          confidence: 0,
        }

        // Agregar a la lista
        this.comments.unshift(newComment)

        // Actualizar DOM
        this.updateCommentsList()

        // Limpiar formulario
        form.reset()

        // Analizar sentimiento del nuevo comentario
        try {
          const analysis = await analyzeSentiment(text)
          newComment.sentiment = analysis.sentiment
          newComment.confidence = analysis.confidence

          // Actualizar DOM con el análisis
          this.updateCommentSentiment(newComment)
        } catch (error) {
          console.error("❌ Error al analizar sentimiento:", error)
          newComment.sentiment = "Error"
          newComment.confidence = 0
        }

        console.log("✅ Comentario agregado y analizado")
      })
    }
  }

  /**
   * Actualiza la lista de comentarios en el DOM
   */
  updateCommentsList() {
    const commentsList = document.getElementById("comments-list")
    if (commentsList) {
      commentsList.innerHTML = this.comments.map((comment) => this.renderComment(comment)).join("")
    }
  }

  /**
   * Configura los controles de cantidad
   */
  setupQuantityControls() {
    const decreaseBtn = document.getElementById("decrease-qty")
    const increaseBtn = document.getElementById("increase-qty")
    const quantityInput = document.getElementById("quantity")

    if (decreaseBtn && increaseBtn && quantityInput) {
      decreaseBtn.addEventListener("click", () => {
        const current = Number.parseInt(quantityInput.value)
        if (current > 1) {
          quantityInput.value = current - 1
        }
      })

      increaseBtn.addEventListener("click", () => {
        const current = Number.parseInt(quantityInput.value)
        if (current < 10) {
          quantityInput.value = current + 1
        }
      })
    }
  }

  /**
   * Configura la galería de imágenes
   */
  setupImageGallery() {
    const mainImage = document.getElementById("main-image")

    if (mainImage) {
      mainImage.addEventListener("click", () => {
        modal.show(
          "Vista Ampliada",
          `<img src="${this.product.image}" alt="${this.product.title}" class="w-full h-auto max-h-screen object-contain" />`,
          { size: "xl" },
        )
      })
    }
  }

  /**
   * Genera HTML para mostrar estrellas de rating
   * @param {number} rating - Rating del 0 al 5
   * @returns {string} HTML de las estrellas
   */
  generateStars(rating) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    let starsHTML = ""

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="text-yellow-400">⭐</span>'
    }

    if (hasHalfStar) {
      starsHTML += '<span class="text-yellow-400">⭐</span>'
    }

    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="text-gray-300">⭐</span>'
    }

    return starsHTML
  }

  /**
   * Obtiene la clase CSS para el sentimiento
   * @param {string} sentiment - Sentimiento analizado
   * @returns {string} Clase CSS
   */
  getSentimentClass(sentiment) {
    switch (sentiment.toLowerCase()) {
      case "positivo":
        return "sentiment-positive"
      case "negativo":
        return "sentiment-negative"
      default:
        return "sentiment-neutral"
    }
  }

  /**
   * Obtiene el icono para el sentimiento
   * @param {string} sentiment - Sentimiento analizado
   * @returns {string} Icono emoji
   */
  getSentimentIcon(sentiment) {
    switch (sentiment.toLowerCase()) {
      case "positivo":
        return "😊"
      case "negativo":
        return "😞"
      default:
        return "😐"
    }
  }

  /**
   * Renderiza skeleton loading para el producto
   * @returns {string} HTML del skeleton
   */
  renderProductSkeleton() {
    return `
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-4 animate-pulse">
              <div class="aspect-square bg-gray-200 rounded-lg"></div>
              <div class="flex space-x-2">
                ${Array(4)
                  .fill(0)
                  .map(() => '<div class="w-20 h-20 bg-gray-200 rounded-lg"></div>')
                  .join("")}
              </div>
            </div>
            <div class="space-y-6 animate-pulse">
              <div class="h-8 bg-gray-200 rounded w-3/4"></div>
              <div class="h-12 bg-gray-200 rounded w-1/2"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  /**
   * Renderiza mensaje de error
   * @param {string} message - Mensaje de error
   * @returns {string} HTML de error
   */
  renderError(message) {
    return `
      <div class="container mx-auto px-4 py-16 text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error</h2>
        <p class="text-gray-600 mb-4">${message}</p>
        <div class="space-x-4">
          <button onclick="router.navigate('/catalog')" class="btn-primary">
            Volver al Catálogo
          </button>
          <button onclick="location.reload()" class="btn-secondary">
            Intentar de nuevo
          </button>
        </div>
      </div>
    `
  }
}

// Funciones globales para los botones de acción
window.addToCart = () => {
  alert("¡Producto agregado al carrito! 🛒")
}

window.buyNow = () => {
  alert("Redirigiendo al checkout... ⚡")
}
