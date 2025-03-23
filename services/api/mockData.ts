"use client"

import type { Property, PropertySearchParams } from "./propertyService"
import type { User } from "./userService"
import type { Tag } from "../../TagSystem"

// Mock properties data
export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Elegant Apartment in 16th",
    description:
      "Beautiful apartment located in the prestigious 16th arrondissement. This property features high ceilings, hardwood floors, and large windows that provide plenty of natural light.",
    price: 780000,
    location: {
      address: "Avenue Victor Hugo • 16th",
      city: "Paris",
      postalCode: "75016",
      country: "France",
      coordinates: {
        latitude: 48.8662,
        longitude: 2.2855,
      },
    },
    features: {
      size: 85,
      bedrooms: 2,
      bathrooms: 1,
      hasBalcony: true,
      hasElevator: true,
      hasParking: false,
      yearBuilt: 1930,
      energyClass: "D",
    },
    images: ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop"],
    certification: {
      score: 4,
      details: "Certified by French Property Standards",
      date: "2023-06-15",
    },
    agent: {
      id: "a1",
      name: "Pierre Dubois",
      phone: "+33123456789",
      email: "pierre@frenchproperty.com",
      agency: "Paris Luxury Real Estate",
    },
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2023-10-15T14:30:00Z",
  },
  {
    id: "2",
    title: "Charming Apartment in Passy",
    description:
      "Charming apartment in the heart of Passy with a beautiful view. Recently renovated with high-quality materials.",
    price: 750000,
    location: {
      address: "Rue de Passy • 16th",
      city: "Paris",
      postalCode: "75016",
      country: "France",
      coordinates: {
        latitude: 48.8566,
        longitude: 2.2845,
      },
    },
    features: {
      size: 78,
      bedrooms: 2,
      bathrooms: 1,
      hasBalcony: false,
      hasElevator: true,
      hasParking: true,
      yearBuilt: 1925,
      energyClass: "C",
    },
    images: ["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop"],
    certification: {
      score: 4,
      details: "Certified by French Property Standards",
      date: "2023-05-20",
    },
    agent: {
      id: "a2",
      name: "Sophie Martin",
      phone: "+33198765432",
      email: "sophie@frenchproperty.com",
      agency: "Paris Luxury Real Estate",
    },
    createdAt: "2023-09-15T09:00:00Z",
    updatedAt: "2023-10-10T11:20:00Z",
  },
  {
    id: "3",
    title: "Spacious Apartment with Garden View",
    description:
      "Spacious apartment with a beautiful view of the garden. Located in a quiet area of the 16th arrondissement.",
    price: 795000,
    location: {
      address: "Boulevard Suchet • 16th",
      city: "Paris",
      postalCode: "75016",
      country: "France",
      coordinates: {
        latitude: 48.8605,
        longitude: 2.2635,
      },
    },
    features: {
      size: 90,
      bedrooms: 3,
      bathrooms: 2,
      hasBalcony: true,
      hasElevator: true,
      hasParking: true,
      yearBuilt: 1935,
      energyClass: "C",
    },
    images: ["https://images.unsplash.com/photo-1580237072353-751a8a5b2598?q=80&w=2070&auto=format&fit=crop"],
    certification: {
      score: 5,
      details: "Certified by French Property Standards",
      date: "2023-07-10",
    },
    agent: {
      id: "a1",
      name: "Pierre Dubois",
      phone: "+33123456789",
      email: "pierre@frenchproperty.com",
      agency: "Paris Luxury Real Estate",
    },
    createdAt: "2023-08-20T14:00:00Z",
    updatedAt: "2023-10-05T16:45:00Z",
  },
  {
    id: "4",
    title: "Bright Apartment near Eiffel Tower",
    description:
      "Bright and spacious apartment with a view of the Eiffel Tower. Perfect for those who want to live in the heart of Paris.",
    price: 820000,
    location: {
      address: "Rue de la Pompe • 16th",
      city: "Paris",
      postalCode: "75016",
      country: "France",
      coordinates: {
        latitude: 48.8635,
        longitude: 2.275,
      },
    },
    features: {
      size: 92,
      bedrooms: 2,
      bathrooms: 2,
      hasBalcony: true,
      hasElevator: true,
      hasParking: false,
      yearBuilt: 1940,
      energyClass: "D",
    },
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop"],
    certification: {
      score: 4,
      details: "Certified by French Property Standards",
      date: "2023-04-25",
    },
    agent: {
      id: "a3",
      name: "Jean Dupont",
      phone: "+33187654321",
      email: "jean@frenchproperty.com",
      agency: "Paris Prestige Properties",
    },
    createdAt: "2023-07-10T11:30:00Z",
    updatedAt: "2023-09-28T09:15:00Z",
  },
  {
    id: "5",
    title: "Luxurious Apartment with Terrace",
    description:
      "Luxurious apartment with a large terrace offering panoramic views of Paris. High-end finishes throughout.",
    price: 760000,
    location: {
      address: "Avenue Foch • 16th",
      city: "Paris",
      postalCode: "75016",
      country: "France",
      coordinates: {
        latitude: 48.8715,
        longitude: 2.2685,
      },
    },
    features: {
      size: 82,
      bedrooms: 2,
      bathrooms: 1,
      hasBalcony: true,
      hasElevator: true,
      hasParking: true,
      yearBuilt: 1928,
      energyClass: "C",
    },
    images: ["https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop"],
    certification: {
      score: 5,
      details: "Certified by French Property Standards",
      date: "2023-08-05",
    },
    agent: {
      id: "a2",
      name: "Sophie Martin",
      phone: "+33198765432",
      email: "sophie@frenchproperty.com",
      agency: "Paris Luxury Real Estate",
    },
    createdAt: "2023-06-25T13:45:00Z",
    updatedAt: "2023-09-15T10:30:00Z",
  },
]

// Filter properties based on search params
export function filterProperties(params: PropertySearchParams): Property[] {
  let filteredProperties = [...MOCK_PROPERTIES]

  // Apply filters
  if (params.location && params.location.length > 0) {
    filteredProperties = filteredProperties.filter((property) => {
      return params.location!.some(
        (loc) =>
          property.location.address.toLowerCase().includes(loc.toLowerCase()) ||
          property.location.city?.toLowerCase().includes(loc.toLowerCase()),
      )
    })
  }

  if (params.priceMin !== undefined) {
    filteredProperties = filteredProperties.filter((property) => property.price >= params.priceMin!)
  }

  if (params.priceMax !== undefined) {
    filteredProperties = filteredProperties.filter((property) => property.price <= params.priceMax!)
  }

  if (params.bedrooms && params.bedrooms.length > 0) {
    filteredProperties = filteredProperties.filter((property) => params.bedrooms!.includes(property.features.bedrooms))
  }

  if (params.features && params.features.length > 0) {
    filteredProperties = filteredProperties.filter((property) => {
      return params.features!.some((feature) => {
        const featureLower = feature.toLowerCase()
        if (featureLower === "balcony") return property.features.hasBalcony
        if (featureLower === "elevator") return property.features.hasElevator
        if (featureLower === "parking") return property.features.hasParking
        return false
      })
    })
  }

  // Apply pagination
  const page = params.page || 1
  const limit = params.limit || 10
  const start = (page - 1) * limit
  const end = start + limit

  return filteredProperties.slice(start, end)
}

// Mock user data
export const MOCK_USER: User = {
  id: "user123",
  phone: "+33612345678",
  email: "user@example.com",
  name: "Test User",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
}

// Mock tags for shared criteria
export function getMockTags(): Tag[] {
  const now = new Date()

  return [
    {
      id: "location-1",
      label: "Paris 16e",
      type: "primary",
      category: "location",
      value: "Paris 16e",
      confidence: 0.95,
      active: true,
      created: now,
      modified: now,
    },
    {
      id: "budget-1",
      label: "800000€",
      type: "primary",
      category: "budget",
      value: 800000,
      confidence: 0.9,
      active: true,
      created: now,
      modified: now,
    },
    {
      id: "rooms-1",
      label: "2 bedrooms",
      type: "primary",
      category: "rooms",
      value: 2,
      confidence: 0.9,
      active: true,
      created: now,
      modified: now,
    },
  ]
}

