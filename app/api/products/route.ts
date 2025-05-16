import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

// Helper function to handle database errors
function handleDatabaseError(error: unknown) {
  console.error('Database error details:', {
    error,
    name: error instanceof Error ? error.name : 'Unknown',
    message: error instanceof Error ? error.message : 'Unknown error message',
    stack: error instanceof Error ? error.stack : 'No stack trace'
  })

  if (error instanceof Error) {
    return NextResponse.json({
      error: 'Server error',
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }

  return NextResponse.json({
    error: 'Unknown database error',
    details: String(error)
  }, { status: 500 })
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Parse JSON data
    const products = await request.json()
    const productsArray = Array.isArray(products) ? products : [products]
    
    // Get the first product since we're now handling one at a time
    const product = productsArray[0]
    
    // Validate required fields
    if (!product.title || !product.ageGroup || !product.skill) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'Title, Age Group, and Skill are required'
      }, { status: 400 })
    }

    const productName = (product.productName || product.title).trim()
    const isNew = product.id < 0

    // Check for duplicate names
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('product_name', productName)
      .neq('id', isNew ? -1 : product.id)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking for duplicate product:', checkError)
      throw checkError
    }

    if (existingProduct) {
      return NextResponse.json({ 
        error: 'Duplicate product name',
        details: 'A product with this name already exists'
      }, { status: 400 })
    }

    // Prepare product data
    const productData = {
      title: product.title.trim(),
      product_name: productName,
      age_group: product.ageGroup.trim(),
      skill: product.skill.trim(),
      description: product.description?.trim() || '',
      image: product.image || null
    }

    let result
    if (isNew) {
      // Insert new product
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single()

      if (error) throw error
      result = data
    } else {
      // Update existing product
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id)
        .select()
        .single()

      if (error) throw error
      result = data
    }

    return NextResponse.json([result])
  } catch (error) {
    console.error('Error in POST /api/products:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    console.log('DELETE /api/products: Processing request')
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      console.error('DELETE /api/products: No ID provided')
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }
    
    const productId = parseInt(id, 10)
    if (isNaN(productId)) {
      console.error('DELETE /api/products: Invalid ID format:', id)
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    console.log('DELETE /api/products: Deleting product:', productId)
    await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    
    console.log('DELETE /api/products: Fetching updated products list')
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching updated products:', error)
      return handleDatabaseError(error)
    }
    
    console.log('DELETE /api/products: Successfully deleted product and fetched updates')
    return NextResponse.json(data)
  } catch (error) {
    console.error('DELETE /api/products: Error:', error)
    return handleDatabaseError(error)
  }
}
