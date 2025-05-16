'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestProduct() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const createTestProduct = async () => {
    try {
      const testProduct = {
        title: 'Test Product',
        product_name: 'test-product-' + Date.now(),
        age_group: '18-25',
        skill: 'Beginner',
        image: 'https://example.com/image.jpg'
      }

      const { data, error } = await supabase
        .from('products')
        .insert([testProduct])
        .select()
        .single()

      if (error) {
        throw error
      }

      setMessage('Product created successfully: ' + JSON.stringify(data, null, 2))
      setError('')
    } catch (err) {
      setError('Error creating product: ' + JSON.stringify(err, null, 2))
      setMessage('')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Product Creation</h1>
      
      <button
        onClick={createTestProduct}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create Test Product
      </button>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <pre className="whitespace-pre-wrap">{message}</pre>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </div>
  )
} 