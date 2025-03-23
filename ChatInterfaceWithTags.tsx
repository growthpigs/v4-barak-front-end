"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import TagSystem, { type Tag, TagDetector } from "./TagSystem"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface ChatInterfaceWithTagsProps {
  onCriteriaConfirmed: (tags: Tag[]) => void
}

const ChatInterfaceWithTags: React.FC<ChatInterfaceWithTagsProps> = ({ onCriteriaConfirmed }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Bonjour! Je suis votre assistant immobilier. Comment puis-je vous aider à trouver votre propriété idéale?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [tags, setTags] = useState<Tag[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Tag detector instance
  const tagDetector = new TagDetector()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Mock AI response - in real app, this would call Gemini Pro
  const getAIResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Detect tags from the message
    const detectedTags = tagDetector.detectTags(userMessage)

    // Add new tags (avoid duplicates)
    if (detectedTags.length > 0) {
      setTags((prevTags) => {
        const newTags = [...prevTags]

        detectedTags.forEach((newTag) => {
          // Check if similar tag already exists
          const existingSimilar = newTags.find(
            (t) => t.category === newTag.category && t.label.toLowerCase() === newTag.label.toLowerCase(),
          )

          if (!existingSimilar) {
            newTags.push(newTag)
          }
        })

        return newTags
      })
    }

    // Simple response logic - would be replaced with actual AI
    let response = ""

    if (userMessage.toLowerCase().includes("bonjour") || userMessage.toLowerCase().includes("salut")) {
      response = "Bonjour! Je suis ravi de vous aider dans votre recherche immobilière. Que recherchez-vous?"
    } else if (
      userMessage.toLowerCase().includes("16") ||
      userMessage.toLowerCase().includes("16e") ||
      userMessage.toLowerCase().includes("seizième")
    ) {
      response =
        "Le 16ème arrondissement est un excellent choix! C'est un quartier résidentiel prisé. Quel est votre budget? Et combien de pièces recherchez-vous?"
    } else if (
      userMessage.toLowerCase().includes("budget") ||
      userMessage.toLowerCase().includes("€") ||
      userMessage.toLowerCase().includes("euro")
    ) {
      response = "Merci pour cette information sur votre budget. Et combien de pièces souhaitez-vous?"
    } else if (
      userMessage.toLowerCase().includes("chambre") ||
      userMessage.toLowerCase().includes("pièce") ||
      userMessage.toLowerCase().includes("pièces")
    ) {
      response =
        "Un appartement avec ce nombre de pièces, parfait! Recherchez-vous des caractéristiques particulières comme un balcon ou une rénovation récente?"
    } else if (userMessage.toLowerCase().includes("balcon") || userMessage.toLowerCase().includes("terrasse")) {
      response =
        "Je vais rechercher des propriétés avec balcon ou terrasse. Vos critères semblent clairs, voulez-vous voir les résultats maintenant?"
    } else if (
      userMessage.toLowerCase().includes("résultat") ||
      userMessage.toLowerCase().includes("voir") ||
      userMessage.toLowerCase().includes("montrer")
    ) {
      response =
        "Excellent! J'ai trouvé plusieurs propriétés qui correspondent à vos critères. Vous pouvez les consulter en faisant défiler les cartes."

      // Check if we have enough criteria to show results
      const hasLocation = tags.some((tag) => tag.category === "location" && tag.active)
      const hasBudget = tags.some((tag) => tag.category === "budget" && tag.active)
      const hasRooms = tags.some((tag) => tag.category === "rooms" && tag.active)

      if (hasLocation && hasBudget && hasRooms) {
        // Trigger transition to card stack after a delay
        setTimeout(() => {
          onCriteriaConfirmed(tags.filter((tag) => tag.active))
        }, 1500)
      } else {
        response =
          "Avant de vous montrer des résultats, j'aurais besoin de quelques informations supplémentaires. " +
          (!hasLocation ? "Dans quel quartier cherchez-vous? " : "") +
          (!hasBudget ? "Quel est votre budget? " : "") +
          (!hasRooms ? "Combien de pièces souhaitez-vous? " : "")
      }
    } else {
      response =
        "Pourriez-vous me préciser ce que vous recherchez? Par exemple, le quartier, votre budget, et le nombre de pièces souhaité."
    }

    setIsTyping(false)
    return response
  }

  // Handle tag toggle
  const handleTagToggle = (tagId: string) => {
    setTags((prevTags) => prevTags.map((tag) => (tag.id === tagId ? { ...tag, active: !tag.active } : tag)))
  }

  // Handle tag removal
  const handleTagRemove = (tagId: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId))
  }

  // Handle tag update
  const handleTagUpdate = (tagId: string, newValue: string | number | Array<any>) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === tagId) {
          return {
            ...tag,
            label: typeof newValue === "string" ? newValue : String(newValue),
            value: newValue,
            modified: new Date(),
          }
        }
        return tag
      }),
    )
  }

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Get AI response
    const response = await getAIResponse(input)

    // Add assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] bg-gray-50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "200ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "400ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Tag System */}
      {tags.length > 0 && (
        <TagSystem
          tags={tags}
          onTagToggle={handleTagToggle}
          onTagRemove={handleTagRemove}
          onTagUpdate={handleTagUpdate}
        />
      )}

      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Dites-moi ce que vous recherchez..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSendMessage}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterfaceWithTags

