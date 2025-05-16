export type Product = {
  id: number
  title: string
  product_name: string
  age_group: string
  skill: string
  description: string
  image?: string
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 