export type Language = "fr" | "en" | "unknown"

class LanguageService {
  private readonly FRENCH_INDICATORS = [
    "je",
    "tu",
    "il",
    "elle",
    "nous",
    "vous",
    "ils",
    "elles",
    "le",
    "la",
    "les",
    "un",
    "une",
    "des",
    "du",
    "de",
    "à",
    "est",
    "sont",
    "avec",
    "pour",
    "dans",
    "bonjour",
    "merci",
    "recherche",
    "pièces",
    "chambre",
    "appartement",
    "maison",
    "cherche",
    "veux",
    "besoin",
    "quartier",
    "près",
    "proche",
  ]

  private readonly ENGLISH_INDICATORS = [
    "i",
    "you",
    "he",
    "she",
    "we",
    "they",
    "the",
    "a",
    "an",
    "of",
    "in",
    "is",
    "are",
    "with",
    "for",
    "hello",
    "thanks",
    "looking",
    "want",
    "need",
    "searching",
    "bedroom",
    "house",
    "apartment",
    "flat",
    "condo",
    "property",
    "near",
    "close",
    "area",
    "neighborhood",
    "district",
  ]

  /**
   * Detects the primary language of the input text
   */
  detectLanguage(text: string): Language {
    // Normalize text
    const words = text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[.,;:!?'"()]/g, ""))
      .filter((word) => word.length > 1) // Filter out single letters and empty strings

    if (words.length === 0) return "unknown"

    // Count matches
    let frenchCount = 0
    let englishCount = 0

    words.forEach((word) => {
      if (this.FRENCH_INDICATORS.includes(word)) frenchCount++
      if (this.ENGLISH_INDICATORS.includes(word)) englishCount++
    })

    // Determine language based on threshold and ratio
    const totalWords = words.length
    const frenchRatio = frenchCount / totalWords
    const englishRatio = englishCount / totalWords

    // Require a minimum threshold and comparative advantage
    if (frenchRatio > 0.15 && frenchRatio > englishRatio * 1.2) return "fr"
    if (englishRatio > 0.15 && englishRatio > frenchRatio * 1.2) return "en"

    return "unknown"
  }

  /**
   * Get system language from browser/device settings
   */
  getSystemLanguage(): Language {
    // Check if we're in a browser environment
    if (typeof navigator !== "undefined") {
      const lang = navigator.language.toLowerCase()

      if (lang.startsWith("fr")) return "fr"
      return "en" // Default to English for non-French languages
    }

    return "en" // Default fallback if not in browser
  }

  /**
   * Save the current conversation language preference
   */
  saveConversationLanguage(language: Language): void {
    if (language === "unknown") return

    try {
      localStorage.setItem("conversationLanguage", language)
    } catch (e) {
      console.error("Failed to save language preference", e)
    }
  }

  /**
   * Get the saved conversation language or fallback to system language
   */
  getSavedConversationLanguage(): Language {
    try {
      const saved = localStorage.getItem("conversationLanguage") as Language
      return saved || this.getSystemLanguage()
    } catch (e) {
      return this.getSystemLanguage()
    }
  }
}

// Export a singleton instance
export const languageService = new LanguageService()
export default LanguageService

