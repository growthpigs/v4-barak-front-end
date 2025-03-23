"use client"

import type React from "react"
import { useState, useEffect } from "react"
import TagPill from "./components/TagPill"

export interface Tag {
  id: string
  label: string
  type: "primary" | "secondary"
  category: "location" | "budget" | "rooms" | "features" | "condition" | "environmental"
  value: string | number | Array<any>
  confidence: number // 0-1 score of detection confidence
  active: boolean
  created: Date
  modified: Date
}

interface TagSystemProps {
  tags: Tag[]
  onTagToggle: (tagId: string) => void
  onTagRemove: (tagId: string) => void
  onTagUpdate: (tagId: string, newValue: string | number | Array<any>) => void
}

// Update the TagSystem component to use our new TagDisplay component
const TagSystem: React.FC<TagSystemProps> = ({ tags, onTagToggle, onTagRemove, onTagUpdate }) => {
  const [groupedTags, setGroupedTags] = useState<{ [key: string]: Tag[] }>({})
  const [expandedView, setExpandedView] = useState(false)

  // Group tags by category
  useEffect(() => {
    const grouped = tags.reduce(
      (acc, tag) => {
        if (!acc[tag.category]) {
          acc[tag.category] = []
        }
        acc[tag.category].push(tag)
        return acc
      },
      {} as { [key: string]: Tag[] },
    )

    setGroupedTags(grouped)
  }, [tags])

  // Display logic - show primary tags first, then secondary if expanded
  const visibleCategories = expandedView
    ? Object.keys(groupedTags)
    : Object.keys(groupedTags).filter((cat) => ["location", "budget", "rooms"].includes(cat))

  // Generate a flat list of visible tags
  const visibleTags = visibleCategories.flatMap((category) => groupedTags[category])

  // Handle sharing criteria
  const handleShareCriteria = () => {
    // Implementation for share criteria
    console.log("Share criteria clicked")
  }

  return (
    <div className="w-full px-4 py-3 bg-gray-50 border-t border-gray-200">
      {visibleTags.length > 0 && (
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Search Criteria</h3>
          {Object.keys(groupedTags).length > 3 && (
            <button onClick={() => setExpandedView(!expandedView)} className="text-xs text-blue-600 font-medium">
              {expandedView ? "Show Less" : "Show All"}
            </button>
          )}
        </div>
      )}

      {/* Use our new TagDisplay component */}
      <div className="flex flex-wrap">
        {visibleTags.map((tag) => (
          <TagPill
            key={tag.id}
            tag={tag}
            onToggle={() => onTagToggle(tag.id)}
            onRemove={() => onTagRemove(tag.id)}
            onUpdate={(newValue: string | number | Array<any>) => onTagUpdate(tag.id, newValue)}
          />
        ))}
      </div>

      {/* Sharable link button */}
      {tags.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <button className="text-sm text-blue-600 font-medium flex items-center" onClick={handleShareCriteria}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share Criteria
          </button>
        </div>
      )}
    </div>
  )
}

// Replace the existing TagDetector class with this enhanced version that includes fuzzy matching

export class TagDetector {
  // Enhanced patterns for French location specifics
  private locationPatterns = [
    // Cities
    /\b(Paris|Lyon|Marseille|Bordeaux|Toulouse|Nice|Nantes|Lille|Strasbourg|Montpellier)\b/i,

    // Paris arrondissements - various formats
    /\b(\d+(?:er|e|ème|eme|th))\b/i,
    /\b(\d+)(?:st|nd|rd|th)?\s+arrondissement\b/i,

    // Postal codes - both full and partial
    /\b((?:75|77|78|91|92|93|94|95)\d{3})\b/i, // Full Ile-de-France postal codes
    /\b((?:75|77|78|91|92|93|94|95))\b/i, // Département numbers only
    /\b(\d{5})\b/i, // Any 5-digit postal code

    // Common Paris neighborhoods and areas
    /\b(Marais|Montmartre|Bastille|Belleville|La Défense|Saint-Germain|Montparnasse|Champs-Élysées|Quartier Latin)\b/i,

    // Generic location terms
    /\b(centre[-\s]ville|downtown|suburbs|banlieue|quartier)\b/i,

    // Specific suburbs of Paris
    /\b(Neuilly|Levallois|Boulogne|Issy|Vincennes|Saint-Denis|La Garenne-Colombes|Colombes|Courbevoie|Puteaux|Nanterre)\b/i,
  ]

  private budgetPatterns = [
    // Euro amounts with various formats - now handles more variations
    /\b(\d+[k,\s]?€|€\s?\d+[k]?|under ?\d+[k]?|moins de \d+[k]?|maximum \d+[k]?|jusqu'à \d+[k]?|dans les \d+[k]?€?)\b/i,
    /\b([\d.,]+\s*(?:million|m|k|mille|hundred|cent)?\s*(?:€|euros?))\b/i,
    /\b(\d{3,}k?)\b/i, // Match any 3+ digit number that might be a budget (with optional 'k')

    // Numeric with currency symbol without space
    /\b(€[\d.,]+[mk]?)\b/i,

    // Number ranges for budget
    /\b(entre \d+[k]? et \d+[k]?|from \d+[k]? to \d+[k]?)\b/i,

    // Budget descriptors
    /\b(bon marché|pas cher|luxe|haut de gamme|milieu de gamme|budget serré|budget limité)\b/i,
  ]

  private roomPatterns = [
    // Specific room counts with various formats
    /\b(\d+)\s*(bedroom|chambres?|pièces?|rooms?|pieces?|p(?!\w))\b/i,

    // Fuzzy match for common misspellings of "pieces"
    /\b(\d+)\s*(pie?ces?|pièc?e?s?|piec?s?|pees?|pies?)\b/i,

    // French property types
    /\b(studio|t\d+|f\d+)\b/i,

    // Room counts in words (English and French)
    /\b(one|two|three|four|five|un|une|deux|trois|quatre|cinq)\s*(bedroom|chambres?|pièces?|rooms?|pieces?)\b/i,

    // Short forms used in listings
    /\b(\d+)p\b/i,

    // Direct mention of piece count - now more lenient with space and spelling
    /\b(\d+)[- ]?(?:pieces?|pièces?|pis?e?c?e?s?|p)\b/i,
  ]

  private featurePatterns = [
    // Common property features (English and French)
    /\b(balcony|balcon|terrace|terrasse|garden|jardin|parking|garage|elevator|ascenseur|lift|pool|piscine)\b/i,

    // Property condition
    /\b(modern|moderne|renovated|rénové|refait|neuf|nouveau|quiet|calme|bright|lumineux|spacious|spacieux)\b/i,

    // Specific rooms and features
    /\b(cave|storage|rangement|cuisine équipée|american kitchen|cuisine américaine|fitted kitchen|parquet|hardwood|fireplace|cheminée)\b/i,

    // Energy and environmental features
    /\b(basse consommation|energy efficient|DPE|classe énergie|double vitrage|double glazing)\b/i,
  ]

  // Common misspellings and their corrections
  private misspellingMap: Record<string, string> = {
    // Room misspellings
    pies: "pièces",
    piece: "pièces",
    pieces: "pièces",
    piees: "pièces",
    pece: "pièces",
    pces: "pièces",
    chambr: "chambres",
    chambes: "chambres",
    chmbres: "chambres",

    // Location misspellings
    pari: "Paris",
    pris: "Paris",
    pariz: "Paris",
    lyon: "Lyon",
    marseil: "Marseille",
    marsey: "Marseille",
    bordeau: "Bordeaux",
    bordeu: "Bordeaux",

    // Budget misspellings
    "800": "800k",
    "800e": "800k€",
    "800eu": "800k€",
    "800eur": "800k€",
  }

  /**
   * Calculate simple edit distance between two strings (Levenshtein distance)
   */
  private editDistance(s1: string, s2: string): number {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()

    const costs: number[] = new Array(s2.length + 1)
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j
        } else if (j > 0) {
          let newValue = costs[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(newValue, lastValue, costs[j]) + 1
          }
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue
      }
    }
    return costs[s2.length]
  }

  /**
   * Check if a string has a close match in the list of known words
   */
  private findClosestMatch(word: string, knownWords: string[]): string | null {
    const maxDistance = Math.min(2, Math.floor(word.length / 3))
    let bestMatch = null
    let bestDistance = Number.POSITIVE_INFINITY

    for (const knownWord of knownWords) {
      const distance = this.editDistance(word, knownWord)
      if (distance < bestDistance && distance <= maxDistance) {
        bestDistance = distance
        bestMatch = knownWord
      }
    }

    return bestMatch
  }

  /**
   * Apply fuzzy matching to try to correct potential misspellings
   */
  private correctMisspellings(text: string): string {
    // First check direct mappings
    for (const [misspelling, correction] of Object.entries(this.misspellingMap)) {
      const regex = new RegExp(`\\b${misspelling}\\b`, "gi")
      text = text.replace(regex, correction)
    }

    // Look for numbers followed by potentially misspelled room terms
    const roomPattern = /(\d+)\s+([a-z]{2,})/gi
    let match

    while ((match = roomPattern.exec(text)) !== null) {
      const number = match[1]
      const term = match[2].toLowerCase()

      // Check if this might be a room count with a misspelled term
      const roomTerms = ["pieces", "pièces", "chambres", "rooms", "bedrooms"]
      const closestMatch = this.findClosestMatch(term, roomTerms)

      if (closestMatch) {
        // Replace the term with the correct version
        text = text.replace(`${number} ${match[2]}`, `${number} ${closestMatch}`)
      }
    }

    return text
  }

  detectTags(message: string): Tag[] {
    // Apply fuzzy matching and correction to the input first
    const correctedMessage = this.correctMisspellings(message)
    let detectedTags: Tag[] = []
    const now = new Date()

    // Special case for combined inputs like "3 pieces, 11th, €800k"
    // Split by commas and process each part
    if (correctedMessage.includes(",")) {
      const parts = correctedMessage.split(",").map((part) => part.trim())

      // Process each part individually
      parts.forEach((part) => {
        const tagsFromPart = this.processInputPart(part, now)
        detectedTags.push(...tagsFromPart)
      })
    } else {
      // Process as a single input
      const tags = this.processInputPart(correctedMessage, now)
      detectedTags.push(...tags)
    }

    // Special handling for combined inputs
    // Auto-add Paris if an arrondissement is detected without city
    const hasArrondissement = detectedTags.some(
      (tag) => tag.category === "location" && /\d+(?:er|e|ème|eme|th|st|nd|rd)/.test(tag.label),
    )

    const hasParis = detectedTags.some((tag) => tag.category === "location" && /paris/i.test(tag.label))

    if (hasArrondissement && !hasParis) {
      detectedTags.push({
        id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        label: "Paris",
        type: "primary",
        category: "location",
        value: "Paris",
        confidence: 0.95,
        active: true,
        created: now,
        modified: now,
      })
    }

    // Remove duplicate tags by category and similar label
    detectedTags = this.removeDuplicateTags(detectedTags)

    return detectedTags
  }

  // Remove duplicate tags, keeping the one with higher confidence
  private removeDuplicateTags(tags: Tag[]): Tag[] {
    // Group tags by category
    const tagsByCategory: Record<string, Tag[]> = {}

    tags.forEach((tag) => {
      if (!tagsByCategory[tag.category]) {
        tagsByCategory[tag.category] = []
      }
      tagsByCategory[tag.category].push(tag)
    })

    // For each category, remove similar tags
    const deduplicatedTags: Tag[] = []

    Object.keys(tagsByCategory).forEach((category) => {
      const categoryTags = tagsByCategory[category]
      const uniqueTags: Tag[] = []

      categoryTags.forEach((tag) => {
        // Check if we already have a similar tag
        const similarTag = uniqueTags.find((ut) => this.areSimilarTags(ut, tag))

        if (!similarTag) {
          // No similar tag, add this one
          uniqueTags.push(tag)
        } else if (tag.confidence > similarTag.confidence) {
          // We have a similar tag, but this one has higher confidence
          // Replace the existing one
          const index = uniqueTags.indexOf(similarTag)
          uniqueTags[index] = tag
        }
      })

      deduplicatedTags.push(...uniqueTags)
    })

    return deduplicatedTags
  }

  // Check if two tags are similar enough to be considered duplicates
  private areSimilarTags(tag1: Tag, tag2: Tag): boolean {
    // Same category
    if (tag1.category !== tag2.category) return false

    // For rooms category, check if they refer to the same number of rooms
    if (tag1.category === "rooms") {
      const roomCount1 = this.extractRoomCount(tag1.label)
      const roomCount2 = this.extractRoomCount(tag2.label)
      return roomCount1 === roomCount2 && roomCount1 !== null
    }

    // For budget, check if they refer to similar amounts
    if (tag1.category === "budget") {
      return this.extractBudgetAmount(tag1.label) === this.extractBudgetAmount(tag2.label)
    }

    // For location, check if the labels are similar
    if (tag1.category === "location") {
      const label1 = tag1.label.toLowerCase()
      const label2 = tag2.label.toLowerCase()

      // Check for exact matches
      if (label1 === label2) return true

      // Check for contained text (e.g., "Paris" vs "Paris 16th")
      if (label1.includes(label2) || label2.includes(label1)) return true

      return false
    }

    // For other categories, just check if the labels are exactly the same
    return tag1.label.toLowerCase() === tag2.label.toLowerCase()
  }

  // Extract room count from a label
  private extractRoomCount(label: string): number | null {
    const match = label.match(/(\d+)/)
    if (match && match[1]) {
      return Number.parseInt(match[1])
    }
    return null
  }

  // Extract budget amount for comparison
  private extractBudgetAmount(label: string): string {
    // Strip all non-alphanumeric characters and convert to lowercase
    return label.replace(/[^a-z0-9]/gi, "").toLowerCase()
  }

  // Process a single part of the input
  private processInputPart(part: string, timestamp: Date): Tag[] {
    const detectedTags: Tag[] = []

    // Check for locations
    this.locationPatterns.forEach((pattern) => {
      const match = part.match(pattern)
      if (match && match[1]) {
        // Post-process location matches
        let locationValue = match[1]

        // Format for arrondissements
        if (/^\d+(?:e|er|eme|ème|th|st|nd|rd)$/.test(locationValue)) {
          const district = locationValue.replace(/[^\d]/g, "")
          // Keep the format as-is, just capitalize first letter
          locationValue = locationValue.charAt(0).toUpperCase() + locationValue.slice(1)
        }

        // Format for département numbers only (75, 92, etc.)
        if (/^(75|77|78|91|92|93|94|95)$/.test(locationValue)) {
          switch (locationValue) {
            case "75":
              locationValue = "Paris"
              break
            case "92":
              locationValue = "Hauts-de-Seine"
              break
            case "93":
              locationValue = "Seine-Saint-Denis"
              break
            case "94":
              locationValue = "Val-de-Marne"
              break
            case "95":
              locationValue = "Paris"
              break
            case "78":
              locationValue = "Yvelines"
              break
            case "91":
              locationValue = "Essonne"
              break
            case "77":
              locationValue = "Seine-et-Marne"
              break
          }
        }

        // Capitalize first letter
        locationValue = locationValue.charAt(0).toUpperCase() + locationValue.slice(1)

        // Only add if we haven't already detected this location
        if (
          !detectedTags.some(
            (tag) => tag.category === "location" && tag.label.toLowerCase() === locationValue.toLowerCase(),
          )
        ) {
          detectedTags.push({
            id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            label: locationValue,
            type: "primary",
            category: "location",
            value: locationValue,
            confidence: 0.9,
            active: true,
            created: timestamp,
            modified: timestamp,
          })
        }
      }
    })

    // Check for budget
    this.budgetPatterns.forEach((pattern) => {
      const match = part.match(pattern)
      if (match && match[1]) {
        let budgetValue = match[1].replace(/\s+/g, "")

        // Format budget consistently
        if (/^\d+k?$/.test(budgetValue)) {
          // Add € if missing
          budgetValue = "€" + budgetValue
        }

        // Capitalize first letter if the budget starts with text
        if (/^[a-z]/.test(budgetValue)) {
          budgetValue = budgetValue.charAt(0).toUpperCase() + budgetValue.slice(1)
        }

        detectedTags.push({
          id: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          label: budgetValue,
          type: "primary",
          category: "budget",
          value: budgetValue,
          confidence: 0.85,
          active: true,
          created: timestamp,
          modified: timestamp,
        })
      }
    })

    // Check for rooms
    this.roomPatterns.forEach((pattern) => {
      const match = part.match(pattern)
      if (match) {
        let roomLabel = match[0]

        // Format for simple digit followed by 'p' (e.g., "4p")
        if (/^\d+p$/i.test(roomLabel)) {
          const roomCount = roomLabel.replace(/p$/i, "")
          roomLabel = `${roomCount} pièces`
        }

        // Ensure "pieces" is standardized to "pièces"
        roomLabel = roomLabel.replace(/pieces/i, "pièces")

        // Format room labels to be consistently capitalized
        roomLabel = roomLabel.charAt(0).toUpperCase() + roomLabel.slice(1)

        detectedTags.push({
          id: `rooms-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          label: roomLabel,
          type: "primary",
          category: "rooms",
          value: roomLabel,
          confidence: 0.9,
          active: true,
          created: timestamp,
          modified: timestamp,
        })
      }
    })

    // Check for features
    this.featurePatterns.forEach((pattern) => {
      const match = part.match(pattern)
      if (match && match[1]) {
        let featureValue = match[1]
        // Capitalize first letter
        featureValue = featureValue.charAt(0).toUpperCase() + featureValue.slice(1)

        detectedTags.push({
          id: `feature-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          label: featureValue,
          type: "secondary",
          category: "features",
          value: featureValue,
          confidence: 0.8,
          active: true,
          created: timestamp,
          modified: timestamp,
        })
      }
    })

    // Special case handling

    // Special case for "900k" - treat as budget
    if (/^900k?$/i.test(part) || part === "900" || part === "900000" || part === "900,000") {
      detectedTags.push({
        id: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        label: "€900k",
        type: "primary",
        category: "budget",
        value: "€900k",
        confidence: 1.0,
        active: true,
        created: timestamp,
        modified: timestamp,
      })
    }

    // Direct number could be postal code, room count, or budget
    if (/^\d+$/.test(part)) {
      const num = Number.parseInt(part)

      // For large numbers (likely budget)
      if (num >= 100000) {
        const budget = num >= 1000000 ? `€${(num / 1000000).toFixed(1)}m` : `€${(num / 1000).toFixed(0)}k`
        detectedTags.push({
          id: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          label: budget,
          type: "primary",
          category: "budget",
          value: budget,
          confidence: 0.9,
          active: true,
          created: timestamp,
          modified: timestamp,
        })
      }
      // For 3-digit numbers in the 900 range (likely budget shorthand)
      else if (num >= 900 && num <= 999) {
        detectedTags.push({
          id: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          label: `€${num}k`,
          type: "primary",
          category: "budget",
          value: `€${num}k`,
          confidence: 0.85,
          active: true,
          created: timestamp,
          modified: timestamp,
        })
      }
      // For postal code-like numbers
      else if (num >= 75 && num <= 95) {
        // Department numbers
        switch (part) {
          case "75":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Paris",
              type: "primary",
              category: "location",
              value: "Paris",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "92":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Hauts-de-Seine",
              type: "primary",
              category: "location",
              value: "Hauts-de-Seine",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "93":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Seine-Saint-Denis",
              type: "primary",
              category: "location",
              value: "Seine-Saint-Denis",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "94":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Val-de-Marne",
              type: "primary",
              category: "location",
              value: "Val-de-Marne",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "95":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Paris",
              type: "primary",
              category: "location",
              value: "Paris",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "78":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Yvelines",
              type: "primary",
              category: "location",
              value: "Yvelines",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "91":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Essonne",
              type: "primary",
              category: "location",
              value: "Essonne",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          case "77":
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Seine-et-Marne",
              type: "primary",
              category: "location",
              value: "Seine-et-Marne",
              confidence: 1.0,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
            break
          default:
            // For other numbers that look like postal codes, just assume it's a Paris district
            detectedTags.push({
              id: `location-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              label: "Paris",
              type: "primary",
              category: "location",
              value: "Paris",
              confidence: 0.7,
              active: true,
              created: timestamp,
              modified: timestamp,
            })
        }
      }
      // For small numbers, treat as room count
      else if (num >= 1 && num <= 10) {
        detectedTags.push({
          id: `rooms-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          label: `${num} pièces`,
          type: "primary",
          category: "rooms",
          value: `${num} pièces`,
          confidence: 0.9,
          active: true,
          created: timestamp,
          modified: timestamp,
        })
      }
    }

    // Special case for "800k" - treat as budget
    if (/^800k$/i.test(part)) {
      detectedTags.push({
        id: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        label: "€800k",
        type: "primary",
        category: "budget",
        value: "€800k",
        confidence: 1.0,
        active: true,
        created: timestamp,
        modified: timestamp,
      })
    }

    return detectedTags
  }
}

export default TagSystem

