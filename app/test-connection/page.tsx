'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by fetching products
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(1)

        if (error) {
          throw error
        }

        setProducts(data)
        setStatus('connected')
      } catch (err) {
        console.error('Connection error:', err)
        setError(err instanceof Error ? err.message : 'Failed to connect to Supabase')
        setStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="mb-4">
        <p className="font-semibold">Connection Status: </p>
        {status === 'loading' && <p className="text-yellow-500">Testing connection...</p>}
        {status === 'connected' && <p className="text-green-500">Successfully connected to Supabase!</p>}
        {status === 'error' && (
          <div className="text-red-500">
            <p>Failed to connect to Supabase</p>
            {error && <p className="text-sm mt-1">{error}</p>}
          </div>
        )}
      </div>

      {status === 'connected' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Query Results:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Environment Check:</h2>
        <p>Supabase URL configured: {Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL).toString()}</p>
        <p>Supabase Anon Key configured: {Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toString()}</p>
      </div>
    </div>
  )
} 