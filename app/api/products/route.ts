import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const productsData = await request.json()
    const productsArray = Array.isArray(productsData) ? productsData : [productsData]
    
    // Validate all products
    for (const product of productsArray) {
      if (!product.title || !product.ageGroup || !product.skill) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        )
      }
      const validAgeGroups = ['2-3', '4-5', '6-7', '8-9']
      if (!validAgeGroups.includes(product.ageGroup)) {
        return NextResponse.json(
          { error: 'Invalid age group' },
          { status: 400 }
        )
      }
    }

    // Get all existing products
    const incomingProductNames = productsArray.map((p: any) => p.productName)

    // Delete products not in the incoming list
    await prisma.product.deleteMany({
      where: {
        productName: {
          notIn: incomingProductNames,
        },
      },
    })

    // Upsert (add or update) each product
    for (const product of productsArray) {
      let whereClause: any;
      if (typeof product.id === 'number' && product.id > 0) {
        // Only use id for existing products (positive id)
        whereClause = { id: product.id };
      } else {
        // For new products (negative id), use productName
        whereClause = { productName: product.productName };
      }
      await prisma.product.upsert({
        where: whereClause,
        update: {
          title: product.title,
          ageGroup: product.ageGroup,
          skill: product.skill,
          image: product.image,
        },
        create: {
          title: product.title,
          productName: product.productName || product.title, // Use title as productName if not provided
          ageGroup: product.ageGroup,
          skill: product.skill,
          image: product.image,
        },
      })
    }

    // Return the updated product list
    const updatedProducts = await prisma.product.findMany()
    return NextResponse.json(updatedProducts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save products' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    // Get the product ID from the URL search params
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Convert ID to number and delete the product
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    await prisma.product.delete({
      where: { id: productId }
    });
    
    // Return the updated product list
    const updatedProducts = await prisma.product.findMany();
    return NextResponse.json(updatedProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
