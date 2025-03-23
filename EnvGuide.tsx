"use client"

import { useState } from "react"
import { Check, Copy, Info } from "lucide-react"

export default function EnvGuide() {
  const [copied, setCopied] = useState<string | null>(null)

  const envFiles = [
    {
      id: "local",
      name: ".env.local",
      content: `# .env.local
NEXT_PUBLIC_API_URL=https://api.frenchpropertyfinder.com/v1

# For local development without a real API, you can leave it unset:
# NEXT_PUBLIC_API_URL=
# (When not set, the app will use mock data)`,
    },
    {
      id: "development",
      name: ".env.development",
      content: `# .env.development
NEXT_PUBLIC_API_URL=https://dev-api.frenchpropertyfinder.com/v1`,
    },
    {
      id: "production",
      name: ".env.production",
      content: `# .env.production
NEXT_PUBLIC_API_URL=https://api.frenchpropertyfinder.com/v1`,
    },
  ]

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Environment Variable Setup Guide</h1>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg flex items-start">
        <Info className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
        <div>
          <p className="text-blue-800 font-medium">Important</p>
          <p className="text-blue-700 text-sm">
            The application requires the <code className="bg-blue-100 px-1 py-0.5 rounded">NEXT_PUBLIC_API_URL</code>{" "}
            environment variable to connect to the API. If this variable is not set, the app will use mock data for
            development.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Setting Up Environment Variables</h2>

      <div className="space-y-6">
        {envFiles.map((file) => (
          <div key={file.id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
              <span className="font-medium">{file.name}</span>
              <button
                onClick={() => copyToClipboard(file.id, file.content)}
                className="text-gray-600 hover:text-gray-900 p-1 rounded"
              >
                {copied === file.id ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-gray-50 text-gray-800">{file.content}</pre>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">Vercel Deployment</h2>
      <p className="mb-4">If deploying to Vercel:</p>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>Go to your project in the Vercel dashboard</li>
        <li>Navigate to Settings &gt; Environment Variables</li>
        <li>
          Add <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_API_URL</code> with the appropriate value
          for each environment
        </li>
      </ol>

      <h2 className="text-xl font-semibold mt-8 mb-3">Troubleshooting</h2>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="font-medium text-yellow-800 mb-2">If you see the "Missing Environment Variables" warning:</p>
        <ol className="list-decimal pl-6 space-y-1 text-yellow-700">
          <li>
            Check that <code className="bg-yellow-100 px-1 py-0.5 rounded">.env.local</code> exists and contains the
            proper variables
          </li>
          <li>
            Make sure the variable name is exactly{" "}
            <code className="bg-yellow-100 px-1 py-0.5 rounded">NEXT_PUBLIC_API_URL</code>
          </li>
          <li>Restart your development server after adding environment variables</li>
          <li>If developing without an API, you can safely ignore this warning as the app will use mock data</li>
        </ol>
      </div>
    </div>
  )
}

