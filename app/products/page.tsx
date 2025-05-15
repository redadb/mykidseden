'use client'
import { useState, useRef, ChangeEvent, useEffect } from 'react'

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
  image: string | null
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
  const [containers, setContainers] = useState<ProductContainer[]>([
    { id: 1, title: "", productName: "", ageGroup: "", skill: "", image: null }
  ])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setContainers(data.length ? data : [
        { id: 1, title: "", productName: "", ageGroup: "", skill: "", image: null }
      ]);
    };
    fetchProducts();
  }, []);

  const handleSaveProducts = async () => {
    // Validation: no empty or duplicate productName
    const validProducts = containers.filter(c => c.title && c.ageGroup && c.skill)
    
    // Use title as productName if not provided
    const productsToSave = validProducts.map(product => ({
      ...product,
      productName: product.productName || product.title
    }))
    
    const productNames = productsToSave.map(p => p.productName.trim())
    const hasEmpty = productNames.some(name => !name)
    const hasDuplicate = new Set(productNames).size !== productNames.length
    
    if (hasEmpty) {
      alert('All products must have a non-empty Product Name.')
      return
    }
    if (hasDuplicate) {
      alert('Product Names must be unique.')
      return
    }
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productsToSave),
      });
      if (!response.ok) {
        throw new Error('Failed to save products');
      }
      // Refresh the product list after save
      const data = await fetch('/api/products');
      const products = await data.json();
      setContainers([
        ...products,
        {
          id: Date.now() * -1,
          title: "",
          productName: "",
          ageGroup: "",
          skill: "",
          image: null
        }
      ]);
      alert('Products saved successfully!');
    } catch (error) {
      alert('Error saving products');
      console.error(error);
    }
  };
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  const handleAddContainer = () => {
    // Use a unique negative id for new products
    const newId = Date.now() * -1;
    setContainers([...containers, {
      id: newId,
      title: "",
      productName: "",
      ageGroup: "",
      skill: "",
      image: null
    }])
  }

  const handleTitleChange = (id: number, value: string) => {
    setContainers(containers.map(container => 
      container.id === id ? { ...container, title: value } : container
    ))
  }

  const handleAgeChange = (id: number, value: string) => {
    setContainers(containers.map(container => 
      container.id === id ? { ...container, ageGroup: value, skill: "" } : container
    ))
  }

  const handleSkillChange = (id: number, value: string) => {
    setContainers(containers.map(container => 
      container.id === id ? { ...container, skill: value } : container
    ))
  }

  const handleImageUpload = async (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.url) {
        setContainers(containers.map(container =>
          container.id === id ? { ...container, image: data.url } : container
        ))
      } else {
        alert('Image upload failed')
      }
    }
  }

  const handleDeleteContainer = async (id: number) => {
    // For new products (negative IDs), just remove from state
    if (id < 0) {
      if (containers.length > 1) {
        setContainers(containers.filter(container => container.id !== id));
      } else {
        // Reset to empty state if deleting last product
        setContainers([{ 
          id: Date.now() * -1,
          title: "",
          productName: "",
          ageGroup: "",
          skill: "",
          image: null
        }]);
      }
      return;
    }
    
    // For existing products (positive IDs), call the DELETE API
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Update the product list with the response
      const updatedProducts = await response.json();
      
      // If no products left, add an empty one
      if (updatedProducts.length === 0) {
        setContainers([{ 
          id: Date.now() * -1,
          title: "",
          productName: "",
          ageGroup: "",
          skill: "",
          image: null
        }]);
      } else {
        setContainers(updatedProducts);
      }
      
    } catch (error) {
      alert('Error deleting product');
      console.error(error);
    }
  }

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
                  onChange={(e) => handleTitleChange(container.id, e.target.value)}
                  className="text-lg md:text-xl font-semibold border-b-2 border-blue-200 focus:border-blue-500 outline-none bg-transparent pb-1 w-full"
                />
                <input
                  type="text"
                  value={container.productName}
                  placeholder="Product name (optional)"
                  onChange={(e) => setContainers(containers.map(c => 
                    c.id === container.id ? {...c, productName: e.target.value} : c
                  ))}
                  className="text-sm md:text-base border-b border-blue-100 focus:border-blue-300 outline-none bg-transparent pb-1 w-full"
                />
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => document.getElementById(`file-input-${container.id}`)?.click()}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                  title="Upload image"
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
                    onChange={(e) => handleAgeChange(container.id, e.target.value)}
                    className="w-full pl-3 pr-8 py-1.5 md:py-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 outline-none bg-white appearance-none hover:border-blue-200 transition text-sm md:text-base"
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
                    onChange={(e) => handleSkillChange(container.id, e.target.value)}
                    className="w-full pl-3 pr-8 py-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 outline-none bg-white appearance-none hover:border-blue-200 transition"
                    disabled={!container.ageGroup}
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
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition shadow-lg font-medium text-sm md:text-base flex-1 md:flex-none"
        >
          + Add New Product
        </button>
        <button
          onClick={handleSaveProducts}
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition shadow-lg font-medium text-sm md:text-base flex-1 md:flex-none"
        >
          💾 Save All Products
        </button>
      </div>
    </div>
  )
}
