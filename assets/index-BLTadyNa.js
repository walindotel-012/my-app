(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class b{constructor(){this.featuredProducts=[]}async render(){try{return await this.loadFeaturedProducts(),`
        <div class="fade-in">
          ${this.renderHeroSection()}
          ${this.renderFeaturesSection()}
          ${this.renderFeaturedProducts()}
          ${this.renderCallToAction()}
        </div>
      `}catch(e){return console.error("❌ Error al renderizar página de inicio:",e),this.renderError()}}async loadFeaturedProducts(){try{console.log("🔄 Cargando productos destacados...");const e=await fetch("https://fakestoreapi.com/products?limit=4");if(!e.ok)throw new Error(`Error HTTP: ${e.status}`);this.featuredProducts=await e.json(),console.log("✅ Productos destacados cargados:",this.featuredProducts.length)}catch(e){console.error("❌ Error al cargar productos destacados:",e),this.featuredProducts=[]}}renderHeroSection(){return`
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
    `}renderFeaturesSection(){return`
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
            ${[{icon:`<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>`,title:"Amplio Catálogo",description:"Miles de productos cuidadosamente seleccionados para satisfacer todas tus necesidades"},{icon:`<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>`,title:"IA Integrada",description:"Análisis inteligente de opiniones que te ayuda a tomar mejores decisiones de compra"},{icon:`<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>`,title:"Diseño Responsive",description:"Una experiencia de compra perfecta en cualquier dispositivo, adaptada a tus necesidades"},{icon:`<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>`,title:"Carga Rápida",description:"Navegación fluida y sin interrupciones gracias a nuestra tecnología optimizada"}].map(t=>`
              <div class="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <!-- Icono con círculo de fondo -->
                <div class="relative inline-flex mb-6">
                  <div class="absolute inset-0 rounded-full bg-blue-100 transform transition-transform group-hover:scale-110"></div>
                  <div class="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    ${t.icon}
                  </div>
                </div>
                
                <!-- Título y descripción -->
                <h3 class="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  ${t.title}
                </h3>
                <p class="text-slate-600 leading-relaxed">
                  ${t.description}
                </p>
                
                <!-- Flecha indicadora en hover -->
                <div class="absolute bottom-8 right-8 opacity-0 transform translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            `).join("")}
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
    `}renderFeaturedProducts(){return this.featuredProducts.length===0?`
        <section class="py-16">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Productos Destacados</h2>
            <div class="flex justify-center">
              <div class="loader"></div>
            </div>
          </div>
        </section>
      `:`
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
            ${this.featuredProducts.map(e=>this.renderProductCard(e)).join("")}
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
    `}renderProductCard(e){const t=e.title.length>40?e.title.substring(0,40)+"...":e.title;return`
      <div class="card cursor-pointer hover:scale-105 transition-transform duration-200" 
           onclick="router.navigate('/detail', { id: ${e.id} })">
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img 
            src="${e.image}" 
            alt="${e.title}"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 mb-2" title="${e.title}">
            ${t}
          </h3>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-primary">
              $${e.price}
            </span>
            <div class="flex items-center text-sm text-gray-500">
              <span class="text-yellow-400 mr-1">⭐</span>
              ${e.rating.rate}
            </div>
          </div>
        </div>
      </div>
    `}renderCallToAction(){return`
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
    `}renderError(){return`
      <div class="container mx-auto px-4 py-16 text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error al cargar la página</h2>
        <p class="text-gray-600 mb-4">Ha ocurrido un error al cargar el contenido</p>
        <button onclick="location.reload()" class="btn-primary">
          Intentar de nuevo
        </button>
      </div>
    `}}window.scrollToSection=a=>{const e=document.getElementById(a);e&&e.scrollIntoView({behavior:"smooth"})};const w={electronics:"Electrónica",jewelry:"Joyería","men's clothing":"Ropa de Hombre","women's clothing":"Ropa de Mujer",general:"General"};function C(a){return w[a.toLowerCase()]||a}function k(a){return a.replace(/perfect for/gi,"perfecto para").replace(/features/gi,"características").replace(/includes/gi,"incluye").replace(/with/gi,"con").replace(/made of/gi,"hecho de").replace(/available in/gi,"disponible en")}function E(a){var o,i;if(!a||!a.id)return console.warn("⚠️ Producto inválido:",a),"";const e=p(a.title||"Sin título",50),t=p(k(a.description)||"Sin descripción",100),r=g(a.price),s=L(((o=a.rating)==null?void 0:o.rate)||0);return`
    <article class="card group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300" onclick="viewProductDetail(${a.id})">
      <!-- Imagen del producto -->
      <div class="relative overflow-hidden bg-gray-50 aspect-square">
        <img 
          src="${a.image||"/diverse-products-still-life.png"}" 
          alt="${a.title||"Producto"}"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onerror="this.src='/product-error.jpg'"
        />
        
        <!-- Badge de categoría -->
        <div class="absolute top-2 left-2">
          <span class="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full shadow">
            ${C(a.category)||"General"}
          </span>
        </div>
        
        <!-- Badge de descuento (si aplica) -->
        ${a.discount?`
          <div class="absolute top-2 right-2">
            <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -${a.discount}%
            </span>
          </div>
        `:""}
      </div>
      
      <!-- Información del producto -->
      <div class="p-4 bg-white">
        <!-- Título -->
        <h3 class="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-snug" title="${a.title}">
          ${e}
        </h3>
        
        <!-- Descripción -->
        <p class="text-gray-600 text-base mb-3 line-clamp-3 leading-relaxed" title="${a.description}">
          ${t}
        </p>
        
        <!-- Rating y reseñas -->
        <div class="flex items-center mb-3">
          <div class="flex items-center mr-2">
            ${s}
          </div>
          <span class="text-sm font-medium text-gray-600">
            (${((i=a.rating)==null?void 0:i.count)||0} valoraciones)
          </span>
        </div>
        
        <!-- Precio y botón -->
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-primary">
              ${r}
            </span>
            ${a.originalPrice?`
              <span class="text-base text-gray-500 line-through">
                ${g(a.originalPrice)}
              </span>
            `:""}
          </div>
          
          <button 
            class="btn-primary text-sm px-3 py-1 hover:shadow-md"
            onclick="event.stopPropagation(); viewProductDetail(${a.id})"
            aria-label="Ver detalles de ${a.title}"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  `}function p(a,e){return!a||a.length<=e?a:a.substring(0,e).trim()+"..."}function g(a){return typeof a!="number"?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a)}function L(a){const e=Math.floor(a),t=a%1>=.5,r=5-e-(t?1:0);let s="";for(let o=0;o<e;o++)s+='<span class="text-yellow-400">⭐</span>';t&&(s+='<span class="text-yellow-400">⭐</span>');for(let o=0;o<r;o++)s+='<span class="text-gray-300">⭐</span>';return s}window.viewProductDetail=a=>{window.router&&window.router.navigate("/detail",{id:a})};class v{constructor(){this.products=[],this.filteredProducts=[],this.categories=[],this.currentCategory="all",this.currentSearch="",this.isLoading=!1}async render(){try{return await this.loadProducts(),await this.loadCategories(),this.applyFilters(),`
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
      `}catch(e){return console.error("❌ Error al renderizar catálogo:",e),this.renderError()}}afterRender(){this.setupSearchEvents(),this.setupFilterEvents(),console.log("✅ Eventos del catálogo configurados")}async loadProducts(){if(!this.isLoading)try{this.isLoading=!0,console.log("🔄 Cargando productos del catálogo...");const e=await fetch("https://fakestoreapi.com/products");if(!e.ok)throw new Error(`Error HTTP: ${e.status}`);this.products=await e.json(),console.log("✅ Productos cargados:",this.products.length)}catch(e){console.error("❌ Error al cargar productos:",e),this.products=[]}finally{this.isLoading=!1}}async loadCategories(){try{console.log("🔄 Cargando categorías...");const e=await fetch("https://fakestoreapi.com/products/categories");if(!e.ok)throw new Error(`Error HTTP: ${e.status}`);this.categories=await e.json(),console.log("✅ Categorías cargadas:",this.categories)}catch(e){console.error("❌ Error al cargar categorías:",e),this.categories=[]}}renderHeader(){return`
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
    `}renderFilters(){return`
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
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${this.currentSearch?"":"hidden"}"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <!-- Filtros de categoría -->
            <div class="w-full lg:w-auto">
              <div class="flex flex-wrap gap-2 justify-center lg:justify-end">
                <button 
                  class="filter-btn ${this.currentCategory==="all"?"active":""}" 
                  data-category="all"
                >
                  Todas
                </button>
                ${this.categories.map(e=>`
                  <button 
                    class="filter-btn ${this.currentCategory===e?"active":""}" 
                    data-category="${e}"
                  >
                    ${this.capitalizeFirst(e)}
                  </button>
                `).join("")}
              </div>
            </div>
          </div>
          
          <!-- Contador de resultados -->
          <div class="mt-4 text-center lg:text-left">
            <p class="text-gray-600">
              Mostrando <span class="font-semibold">${this.filteredProducts.length}</span> 
              de <span class="font-semibold">${this.products.length}</span> productos
              ${this.currentSearch?`para "<span class="font-semibold">${this.currentSearch}</span>"`:""}
              ${this.currentCategory!=="all"?`en <span class="font-semibold">${this.capitalizeFirst(this.currentCategory)}</span>`:""}
            </p>
          </div>
        </div>
      </section>
    `}renderProductGrid(){return this.isLoading?this.renderLoading():this.filteredProducts.length===0?this.renderNoResults():`
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${this.filteredProducts.map(e=>E(e)).join("")}
          </div>
        </div>
      </section>
    `}renderLoading(){return`
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${Array(8).fill(0).map(()=>`
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
            `).join("")}
          </div>
        </div>
      </section>
    `}renderNoResults(){return`
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
          <p class="text-gray-600 mb-6">
            ${this.currentSearch?`No hay productos que coincidan con "${this.currentSearch}"`:"No hay productos en esta categoría"}
          </p>
          <button 
            onclick="catalogPage.clearFilters()" 
            class="btn-primary"
          >
            Limpiar filtros
          </button>
        </div>
      </section>
    `}setupSearchEvents(){const e=document.getElementById("search-input"),t=document.getElementById("clear-search");if(e){let r;e.addEventListener("input",s=>{clearTimeout(r),r=setTimeout(()=>{this.currentSearch=s.target.value.trim(),this.applyFilters(),this.updateProductGrid(),this.updateClearButton()},300)})}t&&t.addEventListener("click",()=>{this.currentSearch="",e.value="",this.applyFilters(),this.updateProductGrid(),this.updateClearButton()})}setupFilterEvents(){const e=document.querySelectorAll(".filter-btn");e.forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-category");e.forEach(s=>s.classList.remove("active")),t.classList.add("active"),this.currentCategory=r,this.applyFilters(),this.updateProductGrid()})})}applyFilters(){this.filteredProducts=this.products.filter(e=>{const t=this.currentCategory==="all"||e.category===this.currentCategory,r=!this.currentSearch||e.title.toLowerCase().includes(this.currentSearch.toLowerCase())||e.description.toLowerCase().includes(this.currentSearch.toLowerCase())||e.category.toLowerCase().includes(this.currentSearch.toLowerCase());return t&&r}),console.log(`🔍 Filtros aplicados: ${this.filteredProducts.length} productos`)}updateProductGrid(){const e=document.getElementById("main-content");if(e){const t=e.querySelector("section:nth-child(2)"),r=e.querySelector("section:nth-child(3)");t&&(t.outerHTML=this.renderFilters()),r&&(r.outerHTML=this.renderProductGrid()),this.setupSearchEvents(),this.setupFilterEvents()}}updateClearButton(){const e=document.getElementById("clear-search");e&&e.classList.toggle("hidden",!this.currentSearch)}clearFilters(){this.currentSearch="",this.currentCategory="all";const e=document.getElementById("search-input");e&&(e.value=""),this.applyFilters(),this.updateProductGrid()}capitalizeFirst(e){return e.charAt(0).toUpperCase()+e.slice(1)}renderError(){return`
      <div class="container mx-auto px-4 py-16 text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error al cargar el catálogo</h2>
        <p class="text-gray-600 mb-4">Ha ocurrido un error al cargar los productos</p>
        <button onclick="location.reload()" class="btn-primary">
          Intentar de nuevo
        </button>
      </div>
    `}}window.catalogPage=new v;const x=document.createElement("style");x.textContent=`
  .filter-btn {
    @apply px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200;
  }
  
  .filter-btn.active {
    @apply bg-primary text-white border-primary;
  }
`;document.head.appendChild(x);class ${constructor(){this.modalContainer=null,this.isOpen=!1}show(e,t,r={}){const{size:s="md",closable:o=!0,onClose:i=null}=r;this.createModal(e,t,s,o,i),this.modalContainer.classList.remove("hidden"),this.modalContainer.classList.add("flex"),document.body.classList.add("overflow-hidden"),this.isOpen=!0;const n=this.modalContainer.querySelector(".modal-content");n&&n.focus(),console.log("✅ Modal mostrado")}hide(){!this.modalContainer||!this.isOpen||(this.modalContainer.classList.add("hidden"),this.modalContainer.classList.remove("flex"),document.body.classList.remove("overflow-hidden"),this.isOpen=!1,console.log("✅ Modal ocultado"))}createModal(e,t,r,s,o){if(this.modalContainer=document.getElementById("modal-container"),!this.modalContainer){console.error("❌ No se encontró el contenedor del modal");return}const i={sm:"max-w-md",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};this.modalContainer.innerHTML=`
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4" id="modal-overlay">
        <div class="modal-content bg-white rounded-lg shadow-xl ${i[r]} w-full max-h-screen overflow-y-auto" 
             tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          
          <!-- Header del modal -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" class="text-xl font-semibold text-gray-800">
              ${e}
            </h2>
            
            ${s?`
              <button 
                id="modal-close-btn" 
                class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Cerrar modal"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            `:""}
          </div>
          
          <!-- Contenido del modal -->
          <div class="p-6">
            ${t}
          </div>
        </div>
      </div>
    `,this.setupModalEvents(s,o)}setupModalEvents(e,t){if(!e)return;const r=this.modalContainer.querySelector("#modal-overlay"),s=this.modalContainer.querySelector("#modal-close-btn"),o=this.modalContainer.querySelector(".modal-content");r&&r.addEventListener("click",i=>{i.target===r&&(this.hide(),t&&t())}),s&&s.addEventListener("click",()=>{this.hide(),t&&t()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&this.isOpen&&(this.hide(),t&&t())}),o&&o.addEventListener("click",i=>{i.stopPropagation()})}}const f=new $;window.modal=f;class M{constructor(){this.model=null,this.isLoaded=!1,this.vocabulary=null,this.maxLength=100,this.positiveWords=["excelente","bueno","genial","increíble","perfecto","recomendado","fantástico","maravilloso","espectacular","satisfecho","contento","feliz","amor","encanta","gusta","calidad","rápido","eficiente"],this.negativeWords=["malo","terrible","horrible","pésimo","decepcionante","lento","caro","defectuoso","roto","problema","error","falla","odio","disgusto","molesto","frustrado","enojado","insatisfecho"]}async initialize(){if(!this.isLoaded)try{console.log("🤖 Inicializando analizador de sentimientos..."),await this.loadVocabulary(),this.isLoaded=!0,console.log("✅ Analizador de sentimientos inicializado")}catch(e){throw console.error("❌ Error al inicializar analizador:",e),e}}async loadVocabulary(){return new Promise(e=>{setTimeout(()=>{this.vocabulary={"<PAD>":0,"<UNK>":1,el:2,la:3,de:4,que:5,y:6,es:7,en:8,un:9,una:10},e()},1e3)})}async analyze(e){this.isLoaded||await this.initialize();try{console.log("🔍 Analizando sentimiento:",e.substring(0,50)+"...");const t=this.preprocessText(e),r=this.analyzeWithKeywords(t);return console.log("✅ Análisis completado:",r),r}catch(t){return console.error("❌ Error en análisis de sentimiento:",t),{sentiment:"Neutral",confidence:.5,scores:{positive:.33,negative:.33,neutral:.34}}}}preprocessText(e){return e.toLowerCase().replace(/[^\w\sáéíóúñü]/g,"").replace(/\s+/g," ").trim()}analyzeWithKeywords(e){const t=e.split(" ");let r=0,s=0;const o=t.length;t.forEach(m=>{this.positiveWords.includes(m)&&(r+=1),this.negativeWords.includes(m)&&(s+=1)});const i=r/Math.max(o,1),n=s/Math.max(o,1);let l="Neutral",c=.5;return i>n&&r>0?(l="Positivo",c=Math.min(.9,.6+i*.3)):n>i&&s>0?(l="Negativo",c=Math.min(.9,.6+n*.3)):c=.5+Math.random()*.2,{sentiment:l,confidence:c,scores:{positive:i,negative:n,neutral:1-(i+n)},details:{positiveWords:r,negativeWords:s,totalWords:o}}}async analyzeBatch(e){const t=[];for(const r of e){const s=await this.analyze(r);t.push(s),await new Promise(o=>setTimeout(o,100))}return t}getStatistics(e){const t=e.length,r=e.filter(n=>n.sentiment==="Positivo").length,s=e.filter(n=>n.sentiment==="Negativo").length,o=e.filter(n=>n.sentiment==="Neutral").length,i=e.reduce((n,l)=>n+l.confidence,0)/t;return{total:t,distribution:{positive:{count:r,percentage:(r/t*100).toFixed(1)},negative:{count:s,percentage:(s/t*100).toFixed(1)},neutral:{count:o,percentage:(o/t*100).toFixed(1)}},averageConfidence:i.toFixed(2),overallSentiment:r>s?"Positivo":s>r?"Negativo":"Neutral"}}}const y=new M;async function h(a){if(!a||typeof a!="string")throw new Error("Texto inválido para análisis");return await y.analyze(a)}y.initialize().catch(a=>{console.error("❌ Error en inicialización automática:",a)});console.log("🤖 Módulo de análisis de sentimientos cargado");class P{constructor(){this.product=null,this.productId=null,this.comments=[],this.isLoading=!1}async render(e){try{return this.productId=e.get("id"),this.productId?(await this.loadProduct(),this.product?(this.generateSampleComments(),`
        <div class="fade-in">
          ${this.renderBreadcrumb()}
          ${this.renderProductDetail()}
          ${this.renderCommentsSection()}
        </div>
      `):this.renderError("Producto no encontrado")):this.renderError("ID de producto no válido")}catch(t){return console.error("❌ Error al renderizar detalle del producto:",t),this.renderError("Error al cargar el producto")}}afterRender(){this.setupImageGallery(),this.setupCommentForm(),this.setupQuantityControls(),this.analyzeExistingComments(),console.log("✅ Eventos del detalle configurados")}async loadProduct(){if(!this.isLoading)try{this.isLoading=!0,console.log(`🔄 Cargando producto ${this.productId}...`);const e=await fetch(`https://fakestoreapi.com/products/${this.productId}`);if(!e.ok)throw new Error(`Error HTTP: ${e.status}`);this.product=await e.json(),console.log("✅ Producto cargado:",this.product.title)}catch(e){console.error("❌ Error al cargar producto:",e),this.product=null}finally{this.isLoading=!1}}renderBreadcrumb(){var e,t;return`
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
              ${((e=this.product)==null?void 0:e.category)||"Producto"}
            </li>
            <li class="text-gray-400">›</li>
            <li class="text-gray-800 font-semibold truncate max-w-xs">
              ${((t=this.product)==null?void 0:t.title)||"Cargando..."}
            </li>
          </ol>
        </div>
      </nav>
    `}renderProductDetail(){return this.product?`
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
                ${Array(4).fill(0).map((e,t)=>`
                  <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary">
                    <img 
                      src="${this.product.image}" 
                      alt="Vista ${t+1}"
                      class="w-full h-full object-contain"
                      onclick="document.getElementById('main-image').src = this.src"
                    />
                  </div>
                `).join("")}
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
                    $${(this.product.price*1.2).toFixed(2)}
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
    `:this.renderProductSkeleton()}renderCommentsSection(){return`
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
              ${this.comments.map(e=>this.renderComment(e)).join("")}
            </div>
            
            ${this.comments.length===0?`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">💬</div>
                <p class="text-gray-600">Sé el primero en comentar este producto</p>
              </div>
            `:""}
          </div>
        </div>
      </section>
    `}renderComment(e){const t=this.getSentimentClass(e.sentiment),r=this.getSentimentIcon(e.sentiment);return`
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              ${e.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">${e.name}</h4>
              <div class="flex items-center space-x-2">
                <div class="flex">
                  ${this.generateStars(e.rating)}
                </div>
                <span class="text-sm text-gray-500">
                  ${e.date}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Análisis de sentimiento -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">IA:</span>
            <div class="flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${t}">
              <span>${r}</span>
              <span class="font-medium">${e.sentiment}</span>
              <span>(${Math.round(e.confidence*100)}%)</span>
            </div>
          </div>
        </div>
        
        <p class="text-gray-700 leading-relaxed">
          ${e.text}
        </p>
        
        <!-- Acciones del comentario -->
        <div class="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <button class="text-sm text-gray-500 hover:text-primary flex items-center space-x-1">
            <span>👍</span>
            <span>Útil (${e.helpful||0})</span>
          </button>
          <button class="text-sm text-gray-500 hover:text-primary">
            Responder
          </button>
        </div>
      </div>
    `}generateSampleComments(){const e=[{name:"María González",rating:5,text:"¡Excelente producto! La calidad es increíble y llegó muy rápido. Totalmente recomendado.",date:"Hace 2 días",helpful:12},{name:"Carlos Rodríguez",rating:4,text:"Muy buen producto, aunque el precio podría ser un poco mejor. La calidad es buena.",date:"Hace 1 semana",helpful:8},{name:"Ana Martínez",rating:2,text:"No estoy muy satisfecha con la compra. El producto no cumplió mis expectativas.",date:"Hace 2 semanas",helpful:3}];this.comments=e.map(t=>({...t,id:Math.random().toString(36).substr(2,9),sentiment:"Analizando...",confidence:0}))}async analyzeExistingComments(){console.log("🤖 Analizando sentimientos de comentarios existentes...");for(const e of this.comments)try{const t=await h(e.text);e.sentiment=t.sentiment,e.confidence=t.confidence,this.updateCommentSentiment(e)}catch(t){console.error("❌ Error al analizar sentimiento:",t),e.sentiment="Error",e.confidence=0}}updateCommentSentiment(e){const t=document.getElementById("comments-list");t&&(t.innerHTML=this.comments.map(r=>this.renderComment(r)).join(""))}setupCommentForm(){const e=document.getElementById("comment-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("comment-name").value,s=Number.parseInt(document.getElementById("comment-rating").value),o=document.getElementById("comment-text").value;if(!r||!s||!o){alert("Por favor completa todos los campos");return}const i={id:Math.random().toString(36).substr(2,9),name:r,rating:s,text:o,date:"Ahora",helpful:0,sentiment:"Analizando...",confidence:0};this.comments.unshift(i),this.updateCommentsList(),e.reset();try{const n=await h(o);i.sentiment=n.sentiment,i.confidence=n.confidence,this.updateCommentSentiment(i)}catch(n){console.error("❌ Error al analizar sentimiento:",n),i.sentiment="Error",i.confidence=0}console.log("✅ Comentario agregado y analizado")})}updateCommentsList(){const e=document.getElementById("comments-list");e&&(e.innerHTML=this.comments.map(t=>this.renderComment(t)).join(""))}setupQuantityControls(){const e=document.getElementById("decrease-qty"),t=document.getElementById("increase-qty"),r=document.getElementById("quantity");e&&t&&r&&(e.addEventListener("click",()=>{const s=Number.parseInt(r.value);s>1&&(r.value=s-1)}),t.addEventListener("click",()=>{const s=Number.parseInt(r.value);s<10&&(r.value=s+1)}))}setupImageGallery(){const e=document.getElementById("main-image");e&&e.addEventListener("click",()=>{f.show("Vista Ampliada",`<img src="${this.product.image}" alt="${this.product.title}" class="w-full h-auto max-h-screen object-contain" />`,{size:"xl"})})}generateStars(e){const t=Math.floor(e),r=e%1>=.5,s=5-t-(r?1:0);let o="";for(let i=0;i<t;i++)o+='<span class="text-yellow-400">⭐</span>';r&&(o+='<span class="text-yellow-400">⭐</span>');for(let i=0;i<s;i++)o+='<span class="text-gray-300">⭐</span>';return o}getSentimentClass(e){switch(e.toLowerCase()){case"positivo":return"sentiment-positive";case"negativo":return"sentiment-negative";default:return"sentiment-neutral"}}getSentimentIcon(e){switch(e.toLowerCase()){case"positivo":return"😊";case"negativo":return"😞";default:return"😐"}}renderProductSkeleton(){return`
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-4 animate-pulse">
              <div class="aspect-square bg-gray-200 rounded-lg"></div>
              <div class="flex space-x-2">
                ${Array(4).fill(0).map(()=>'<div class="w-20 h-20 bg-gray-200 rounded-lg"></div>').join("")}
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
    `}renderError(e){return`
      <div class="container mx-auto px-4 py-16 text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Error</h2>
        <p class="text-gray-600 mb-4">${e}</p>
        <div class="space-x-4">
          <button onclick="router.navigate('/catalog')" class="btn-primary">
            Volver al Catálogo
          </button>
          <button onclick="location.reload()" class="btn-secondary">
            Intentar de nuevo
          </button>
        </div>
      </div>
    `}}window.addToCart=()=>{alert("¡Producto agregado al carrito! 🛒")};window.buyNow=()=>{alert("Redirigiendo al checkout... ⚡")};class S{constructor(){this.routes={"/":b,"/catalog":v,"/detail":P},this.contentContainer=null}init(){if(this.contentContainer=document.getElementById("main-content"),!this.contentContainer){console.error("❌ No se encontró el contenedor principal");return}this.handleRoute()}async handleRoute(){const e=window.location.pathname,t=new URLSearchParams(window.location.search);console.log(`🔄 Navegando a: ${e}`);let r=this.routes[e];if(!r)if(e.startsWith("/detail"))r=this.routes["/detail"];else{console.warn(`⚠️ Ruta no encontrada: ${e}, redirigiendo al inicio`),this.navigate("/");return}try{this.showLoading();const s=new r,o=await s.render(t);this.contentContainer.innerHTML=o,s.afterRender&&s.afterRender(),window.scrollTo(0,0)}catch(s){console.error("❌ Error al cargar la página:",s),this.showError()}}navigate(e,t={}){const r=new URL(e,window.location.origin);Object.keys(t).forEach(s=>{r.searchParams.set(s,t[s])}),window.history.pushState({},"",r.toString()),this.handleRoute()}showLoading(){this.contentContainer.innerHTML=`
      <div class="flex justify-center items-center min-h-96">
        <div class="text-center">
          <div class="loader mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando...</p>
        </div>
      </div>
    `}showError(){this.contentContainer.innerHTML=`
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
    `}}const d=new S;window.router=d;function z(){const a=document.getElementById("navbar");if(!a){console.error("❌ No se encontró el contenedor de la navbar");return}a.innerHTML=j(),I(),u(),console.log("✅ Navbar inicializada")}function j(){return`
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
  `}function I(){const a=document.getElementById("mobile-menu-btn"),e=document.getElementById("mobile-menu");a&&e&&a.addEventListener("click",()=>{e.classList.toggle("hidden")}),document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(r=>{r.addEventListener("click",s=>{s.preventDefault();const o=r.getAttribute("data-route");e&&e.classList.add("hidden"),window.router&&window.router.navigate(o),u()})}),document.addEventListener("click",r=>{e&&!e.contains(r.target)&&!a.contains(r.target)&&e.classList.add("hidden")})}function u(){const a=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(t=>{const r=t.getAttribute("data-route");t.classList.remove("text-primary","font-semibold","bg-blue-50"),(r===a||a.startsWith("/detail")&&r==="/catalog")&&(t.classList.add("text-primary","font-semibold"),t.classList.contains("mobile-nav-link")&&t.classList.add("bg-blue-50"))})}window.addEventListener("popstate",u);function B(){const a=document.getElementById("footer");if(!a){console.error("❌ No se encontró el contenedor del footer");return}a.innerHTML=T(),console.log("✅ Footer inicializado")}function T(){return`
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
            © ${new Date().getFullYear()} My Store. Todos los derechos reservados. 
            <span class="text-sm">Desarrollado con ❤️ y JavaScript vanilla</span>
          </p>
        </div>
      </div>
    </footer>
  `}function H(){console.log("[My Store] Inicializando aplicacion SPA"),z(),B(),d.init(),window.addEventListener("popstate",()=>{d.handleRoute()}),console.log("[My Store] Aplicacion inicializada correctamente")}document.addEventListener("DOMContentLoaded",H);
