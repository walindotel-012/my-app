/**
 * Componente de tarjeta de producto
 * Muestra información básica del producto y permite ver detalles
 */

// Diccionario de traducción de categorías
const categoryTranslations = {
  'electronics': 'Electrónica',
  'jewelry': 'Joyería',
  "men's clothing": 'Ropa de Hombre',
  "women's clothing": 'Ropa de Mujer',
  'general': 'General'
}

/**
 * Traduce la categoría al español
 * @param {string} category - Categoría en inglés
 * @returns {string} Categoría traducida
 */
function translateCategory(category) {
  return categoryTranslations[category.toLowerCase()] || category
}

/**
 * Mejora y traduce la descripción del producto
 * @param {string} description - Descripción en inglés
 * @returns {string} Descripción traducida y mejorada
 */
function translateDescription(description) {
  // Aquí puedes integrar un servicio de traducción real
  // Por ahora, manejamos algunos casos comunes
  return description
    .replace(/perfect for/gi, 'perfecto para')
    .replace(/features/gi, 'características')
    .replace(/includes/gi, 'incluye')
    .replace(/with/gi, 'con')
    .replace(/made of/gi, 'hecho de')
    .replace(/available in/gi, 'disponible en')
}

/**
 * Crea una tarjeta de producto
 * @param {Object} product - Datos del producto
 * @returns {string} HTML de la tarjeta
 */
export function createProductCard(product) {
  // Validar que el producto tenga los datos necesarios
  if (!product || !product.id) {
    console.warn("⚠️ Producto inválido:", product)
    return ""
  }

  // Truncar título y descripción para mantener diseño consistente
  const truncatedTitle = truncateText(product.title || "Sin título", 50)
  const truncatedDescription = truncateText(translateDescription(product.description) || "Sin descripción", 100)

  // Formatear precio
  const formattedPrice = formatPrice(product.price)

  // Generar estrellas para rating
  const starsHTML = generateStars(product.rating?.rate || 0)

  return `
    <article class="card group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300" onclick="viewProductDetail(${product.id})">
      <!-- Imagen del producto -->
      <div class="relative overflow-hidden bg-gray-50 aspect-square">
        <img 
          src="${product.image || "/diverse-products-still-life.png"}" 
          alt="${product.title || "Producto"}"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onerror="this.src='/product-error.jpg'"
        />
        
        <!-- Badge de categoría -->
        <div class="absolute top-2 left-2">
          <span class="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full shadow">
            ${translateCategory(product.category) || "General"}
          </span>
        </div>
        
        <!-- Badge de descuento (si aplica) -->
        ${
          product.discount
            ? `
          <div class="absolute top-2 right-2">
            <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -${product.discount}%
            </span>
          </div>
        `
            : ""
        }
      </div>
      
      <!-- Información del producto -->
      <div class="p-4 bg-white">
        <!-- Título -->
        <h3 class="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-snug" title="${product.title}">
          ${truncatedTitle}
        </h3>
        
        <!-- Descripción -->
        <p class="text-gray-600 text-base mb-3 line-clamp-3 leading-relaxed" title="${product.description}">
          ${truncatedDescription}
        </p>
        
        <!-- Rating y reseñas -->
        <div class="flex items-center mb-3">
          <div class="flex items-center mr-2">
            ${starsHTML}
          </div>
          <span class="text-sm font-medium text-gray-600">
            (${product.rating?.count || 0} valoraciones)
          </span>
        </div>
        
        <!-- Precio y botón -->
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-primary">
              ${formattedPrice}
            </span>
            ${
              product.originalPrice
                ? `
              <span class="text-base text-gray-500 line-through">
                ${formatPrice(product.originalPrice)}
              </span>
            `
                : ""
            }
          </div>
          
          <button 
            class="btn-primary text-sm px-3 py-1 hover:shadow-md"
            onclick="event.stopPropagation(); viewProductDetail(${product.id})"
            aria-label="Ver detalles de ${product.title}"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  `
}

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

/**
 * Formatea un precio con símbolo de moneda
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado
 */
function formatPrice(price) {
  if (typeof price !== "number") return "$0.00"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

/**
 * Genera HTML para mostrar estrellas de rating
 * @param {number} rating - Rating del 0 al 5
 * @returns {string} HTML de las estrellas
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  let starsHTML = ""

  // Estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="text-yellow-400">⭐</span>'
  }

  // Media estrella
  if (hasHalfStar) {
    starsHTML += '<span class="text-yellow-400">⭐</span>'
  }

  // Estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="text-gray-300">⭐</span>'
  }

  return starsHTML
}

/**
 * Función global para ver detalles del producto
 * @param {number} productId - ID del producto
 */
window.viewProductDetail = (productId) => {
  if (window.router) {
    window.router.navigate("/detail", { id: productId })
  }
}
