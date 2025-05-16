'use client'
import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface AgeGroup {
  age: string
  title: string
}

interface Skill {
  name: string
}

interface ProductContainer {
  id: number
  title: string
  productName: string
  ageGroup: string
  skill: string
  description: string
  image: string | null
  isEditing?: boolean
}

const ageGroups: AgeGroup[] = [
  { age: "2-3", title: "Early Explorers" },
  { age: "4-5", title: "Little Learners" },
  { age: "6-7", title: "School Starters" },
  { age: "8-9", title: "Independent Thinkers" }
]

const skillsByAge: Record<string, Skill[]> = {
  "2-3": [
    { name: "❤️ Emotional Safety" },
    { name: "👋 Sensory Discovery" },
    { name: "🗣️ First Words" },
    { name: "🧦 Early Life Skills" }
  ],
  "4-5": [
    { name: "🔤 Letters & Sounds" },
    { name: "👬 Social Play" },
    { name: "🎭 Pretend & Imagine" },
    { name: "🧮 Early Math" }
  ],
  "6-7": [
    { name: "📖 Reading & Writing" },
    { name: "➕ Thinking & Numbers" },
    { name: "🎒 Responsibility" },
    { name: "🔐 Safe & Private" }
  ],
  "8-9": [
    { name: "🧠 Critical Thinking" },
    { name: "📚 Learn & Research" },
    { name: "📅 Time Management" },
    { name: "💬 Speak with Confidence" }
  ]
}

export default function ProductsPage() {
  const [containers, setContainers] = useState<ProductContainer[]>([])

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      // Map database fields to component fields
      const mappedData = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        productName: item.product_name,
        ageGroup: item.age_group,
        skill: item.skill,
        description: item.description || '',
        image: item.image,
        isEditing: false
      }))
      setContainers(mappedData)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    }
  }

  const handleSaveProduct = async (product: ProductContainer) => {
    if (!product.title || !product.ageGroup || !product.skill) {
      toast.error('Please fill in all required fields (Title, Age Group, and Skill)')
      return
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{
          ...product,
          productName: product.productName || product.title,
          description: product.description || ''
        }])
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save product')
      }

      const savedData = await response.json()
      const savedProduct = savedData[0]
      
      // Map database fields to component fields
      const mappedProduct = {
        id: savedProduct.id,
        title: savedProduct.title,
        productName: savedProduct.product_name,
        ageGroup: savedProduct.age_group,
        skill: savedProduct.skill,
        description: savedProduct.description || '',
        image: savedProduct.image,
        isEditing: false
      }
      
      // Update containers state
      setContainers(prev => prev.map(c => 
        c.id === product.id ? mappedProduct : c
      ))

      toast.success('Product saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save product')
    }
  }

  const handleAddContainer = () => {
    // Create new product with temporary negative ID
    const newProduct: ProductContainer = {
      id: Date.now() * -1,
      title: "",
      productName: "",
      ageGroup: "",
      skill: "",
      description: "",
      image: null,
      isEditing: true
    }
    setContainers(prev => [...prev, newProduct])
  }

  const toggleEdit = (id: number) => {
    setContainers(prev => prev.map(container =>
      container.id === id ? { ...container, isEditing: !container.isEditing } : container
    ))
  }

  const handleDeleteContainer = async (id: number) => {
    try {
      // For new products (negative IDs), just remove from state
      if (id < 0) {
        setContainers(prev => prev.filter(c => c.id !== id))
        return
      }

      // For existing products, call the DELETE API
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      const data = await response.json()
      // Map database fields to component fields
      const mappedData = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        productName: item.product_name,
        ageGroup: item.age_group,
        skill: item.skill,
        description: item.description || '',
        image: item.image,
        isEditing: false
      }))
      
      setContainers(mappedData)
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete product')
    }
  }

  // Simple field update handlers
  const handleFieldChange = (id: number, field: keyof ProductContainer, value: string) => {
    setContainers(prev => prev.map(container =>
      container.id === id ? {
        ...container,
        [field]: value,
        // Reset skill if changing age group
        ...(field === 'ageGroup' ? { skill: '' } : {})
      } : container
    ))
  }

  const handleImageUpload = async (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const loadingToast = toast.loading('Uploading image...')
      
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      toast.dismiss(loadingToast)
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setContainers(prev => prev.map(container =>
        container.id === id ? { ...container, image: data.url } : container
      ))
      
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
    }
  }

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-600 to-teal-600 drop-shadow">
        Product Management
      </h1>
      <p className="text-lg text-gray-700 mb-10 font-medium">
        Upload and manage products for each age group and skill
      </p>
      
      <div className="space-y-6">
        {containers.map(container => (
          <div key={container.id} className="p-6 bg-white rounded-lg shadow-lg border border-blue-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <div className="space-y-2 w-full">
                <input
                  type="text"
                  value={container.title}
                  placeholder="Product title"
                  onChange={(e) => handleFieldChange(container.id, 'title', e.target.value)}
                  disabled={!container.isEditing}
                  className={`text-lg md:text-xl font-semibold border-b-2 border-blue-200 focus:border-blue-500 outline-none bg-transparent pb-1 w-full ${!container.isEditing ? 'opacity-75' : ''}`}
                />
                <input
                  type="text"
                  value={container.productName}
                  placeholder="Product name (optional)"
                  onChange={(e) => handleFieldChange(container.id, 'productName', e.target.value)}
                  disabled={!container.isEditing}
                  className={`text-sm md:text-base border-b border-blue-100 focus:border-blue-300 outline-none bg-transparent pb-1 w-full ${!container.isEditing ? 'opacity-75' : ''}`}
                />
                <textarea
                  value={container.description}
                  placeholder="Short description"
                  onChange={(e) => handleFieldChange(container.id, 'description', e.target.value)}
                  disabled={!container.isEditing}
                  className={`text-sm md:text-base border-b border-blue-100 focus:border-blue-300 outline-none bg-transparent pb-1 w-full resize-none h-20 ${!container.isEditing ? 'opacity-75' : ''}`}
                />
              </div>
              <div className="flex gap-1">
                {container.isEditing ? (
                  <button
                    onClick={() => handleSaveProduct(container)}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                    title="Save product"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => toggleEdit(container.id)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                    title="Edit product"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                )}
                <button 
                  onClick={() => document.getElementById(`file-input-${container.id}`)?.click()}
                  className={`p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all ${!container.isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Upload image"
                  disabled={!container.isEditing}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteContainer(container.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                  title="Delete product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
                <input
                  id={`file-input-${container.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(container.id, e)}
                  className="hidden"
                  disabled={!container.isEditing}
                  ref={el => { if (el) fileInputRefs.current[container.id] = el }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Age Group</label>
                <div className="relative">
                  <select
                    value={container.ageGroup}
                    onChange={(e) => handleFieldChange(container.id, 'ageGroup', e.target.value)}
                    disabled={!container.isEditing}
                    className={`w-full pl-3 pr-8 py-1.5 md:py-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 outline-none bg-white appearance-none hover:border-blue-200 transition text-sm md:text-base ${!container.isEditing ? 'opacity-75' : ''}`}
                  >
                    <option value="">Select Age Group</option>
                    {ageGroups.map(group => (
                      <option key={group.age} value={group.age}>
                        {group.age} | {group.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Skill</label>
                <div className="relative">
                  <select
                    value={container.skill}
                    onChange={(e) => handleFieldChange(container.id, 'skill', e.target.value)}
                    disabled={!container.isEditing || !container.ageGroup}
                    className={`w-full pl-3 pr-8 py-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 outline-none bg-white appearance-none hover:border-blue-200 transition ${!container.isEditing || !container.ageGroup ? 'opacity-75' : ''}`}
                  >
                    <option value="">Select Skill</option>
                    {container.ageGroup && skillsByAge[container.ageGroup]?.map(skill => (
                      <option key={skill.name} value={skill.name}>{skill.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {container.image && (
              <div className="mt-4 flex justify-center">
                <img 
                  src={container.image} 
                  alt="Product preview" 
                  className="w-full max-w-xs md:max-w-full max-h-48 md:max-h-64 object-contain rounded-lg shadow-md border-2 border-blue-100 mx-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddContainer}
          className={`px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg transition shadow-lg font-medium text-sm md:text-base flex-1 md:flex-none`}
        >
          + Add New Product
        </button>
      </div>
    </div>
  )
}
