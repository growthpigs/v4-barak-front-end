"use client"

export default function MyPropertiesPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Properties</h1>

      <div className="mb-4 border-b border-gray-200">
        <nav className="flex">
          <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">Liked</button>
          <button className="px-4 py-2 text-gray-500">Seen</button>
          <button className="px-4 py-2 text-gray-500">Unseen</button>
        </nav>
      </div>

      <div className="space-y-4">
        {/* Property cards would go here */}
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <p className="font-medium">Sample property</p>
          <p className="text-gray-500">Details would go here</p>
        </div>
      </div>
    </div>
  )
}

