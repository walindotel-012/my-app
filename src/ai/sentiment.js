/**
 * Clase para análisis de sentimientos
 */
class SentimentAnalyzer {
  constructor() {
    this.model = null
    this.isLoaded = false
    this.vocabulary = null
    this.maxLength = 100

    // Palabras clave para análisis básico (fallback)
    this.positiveWords = [
      "excelente",
      "bueno",
      "genial",
      "increíble",
      "perfecto",
      "recomendado",
      "fantástico",
      "maravilloso",
      "espectacular",
      "satisfecho",
      "contento",
      "feliz",
      "amor",
      "encanta",
      "gusta",
      "calidad",
      "rápido",
      "eficiente",
    ]

    this.negativeWords = [
      "malo",
      "terrible",
      "horrible",
      "pésimo",
      "decepcionante",
      "lento",
      "caro",
      "defectuoso",
      "roto",
      "problema",
      "error",
      "falla",
      "odio",
      "disgusto",
      "molesto",
      "frustrado",
      "enojado",
      "insatisfecho",
    ]
  }

  /**
   * Inicializa el analizador de sentimientos
   */
  async initialize() {
    if (this.isLoaded) return

    try {
      console.log("🤖 Inicializando analizador de sentimientos...")

      // Por simplicidad, usaremos un análisis basado en palabras clave
      // En un proyecto real, cargarías un modelo pre-entrenado
      await this.loadVocabulary()

      this.isLoaded = true
      console.log("✅ Analizador de sentimientos inicializado")
    } catch (error) {
      console.error("❌ Error al inicializar analizador:", error)
      throw error
    }
  }

  /**
   * Carga el vocabulario para análisis
   */
  async loadVocabulary() {
    // Simular carga de vocabulario
    return new Promise((resolve) => {
      setTimeout(() => {
        this.vocabulary = {
          // Vocabulario básico para tokenización
          "<PAD>": 0,
          "<UNK>": 1,
          el: 2,
          la: 3,
          de: 4,
          que: 5,
          y: 6,
          es: 7,
          en: 8,
          un: 9,
          una: 10,
          // Agregar más palabras según necesidad
        }
        resolve()
      }, 1000)
    })
  }

  /**
   * Analiza el sentimiento de un texto
   * @param {string} text - Texto a analizar
   * @returns {Promise<Object>} Resultado del análisis
   */
  async analyze(text) {
    if (!this.isLoaded) {
      await this.initialize()
    }

    try {
      console.log("🔍 Analizando sentimiento:", text.substring(0, 50) + "...")

      // Preprocesar el texto
      const processedText = this.preprocessText(text)

      // Realizar análisis (usando método basado en palabras clave)
      const result = this.analyzeWithKeywords(processedText)

      console.log("✅ Análisis completado:", result)

      return result
    } catch (error) {
      console.error("❌ Error en análisis de sentimiento:", error)

      // Retornar resultado neutral en caso de error
      return {
        sentiment: "Neutral",
        confidence: 0.5,
        scores: { positive: 0.33, negative: 0.33, neutral: 0.34 },
      }
    }
  }

  /**
   * Preprocesa el texto para análisis
   * @param {string} text - Texto original
   * @returns {string} Texto procesado
   */
  preprocessText(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\sáéíóúñü]/g, "") // Remover puntuación, mantener acentos
      .replace(/\s+/g, " ") // Normalizar espacios
      .trim()
  }

  /**
   * Analiza sentimiento usando palabras clave
   * @param {string} text - Texto procesado
   * @returns {Object} Resultado del análisis
   */
  analyzeWithKeywords(text) {
    const words = text.split(" ")
    let positiveScore = 0
    let negativeScore = 0
    const totalWords = words.length

    // Contar palabras positivas y negativas
    words.forEach((word) => {
      if (this.positiveWords.includes(word)) {
        positiveScore += 1
      }
      if (this.negativeWords.includes(word)) {
        negativeScore += 1
      }
    })

    // Calcular puntuaciones normalizadas
    const positiveRatio = positiveScore / Math.max(totalWords, 1)
    const negativeRatio = negativeScore / Math.max(totalWords, 1)

    // Determinar sentimiento predominante
    let sentiment = "Neutral"
    let confidence = 0.5

    if (positiveRatio > negativeRatio && positiveScore > 0) {
      sentiment = "Positivo"
      confidence = Math.min(0.9, 0.6 + positiveRatio * 0.3)
    } else if (negativeRatio > positiveRatio && negativeScore > 0) {
      sentiment = "Negativo"
      confidence = Math.min(0.9, 0.6 + negativeRatio * 0.3)
    } else {
      // Análisis adicional para textos neutrales
      confidence = 0.5 + Math.random() * 0.2 // Simular variabilidad
    }

    return {
      sentiment,
      confidence,
      scores: {
        positive: positiveRatio,
        negative: negativeRatio,
        neutral: 1 - (positiveRatio + negativeRatio),
      },
      details: {
        positiveWords: positiveScore,
        negativeWords: negativeScore,
        totalWords: totalWords,
      },
    }
  }

  /**
   * Analiza múltiples textos en lote
   * @param {string[]} texts - Array de textos
   * @returns {Promise<Object[]>} Resultados de análisis
   */
  async analyzeBatch(texts) {
    const results = []

    for (const text of texts) {
      const result = await this.analyze(text)
      results.push(result)

      // Pequeña pausa para simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return results
  }

  /**
   * Obtiene estadísticas de sentimiento para un conjunto de textos
   * @param {Object[]} analyses - Resultados de análisis
   * @returns {Object} Estadísticas agregadas
   */
  getStatistics(analyses) {
    const total = analyses.length
    const positive = analyses.filter((a) => a.sentiment === "Positivo").length
    const negative = analyses.filter((a) => a.sentiment === "Negativo").length
    const neutral = analyses.filter((a) => a.sentiment === "Neutral").length

    const avgConfidence = analyses.reduce((sum, a) => sum + a.confidence, 0) / total

    return {
      total,
      distribution: {
        positive: { count: positive, percentage: ((positive / total) * 100).toFixed(1) },
        negative: { count: negative, percentage: ((negative / total) * 100).toFixed(1) },
        neutral: { count: neutral, percentage: ((neutral / total) * 100).toFixed(1) },
      },
      averageConfidence: avgConfidence.toFixed(2),
      overallSentiment: positive > negative ? "Positivo" : negative > positive ? "Negativo" : "Neutral",
    }
  }
}

// Crear instancia global del analizador
const sentimentAnalyzer = new SentimentAnalyzer()

/**
 * Función principal para analizar sentimiento
 * @param {string} text - Texto a analizar
 * @returns {Promise<Object>} Resultado del análisis
 */
export async function analyzeSentiment(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Texto inválido para análisis")
  }

  return await sentimentAnalyzer.analyze(text)
}

/**
 * Analiza múltiples textos
 * @param {string[]} texts - Array de textos
 * @returns {Promise<Object[]>} Resultados de análisis
 */
export async function analyzeSentimentBatch(texts) {
  if (!Array.isArray(texts)) {
    throw new Error("Se esperaba un array de textos")
  }

  return await sentimentAnalyzer.analyzeBatch(texts)
}

/**
 * Obtiene estadísticas de sentimiento
 * @param {Object[]} analyses - Resultados de análisis
 * @returns {Object} Estadísticas agregadas
 */
export function getSentimentStatistics(analyses) {
  return sentimentAnalyzer.getStatistics(analyses)
}

// Inicializar automáticamente el analizador
sentimentAnalyzer.initialize().catch((error) => {
  console.error("❌ Error en inicialización automática:", error)
})

console.log("🤖 Módulo de análisis de sentimientos cargado")
