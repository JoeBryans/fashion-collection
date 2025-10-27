import { Database } from "./supabase/supabase"

export type ProductType = {
  id: string
  name: string
  description: string
  price: number
  discount: number
  slug: string
  stockQty: number
  brand: string
  colors: [
    {
      color: string
    }
  ]
  sizes: [{
        size: string
  }]
  categoryId: {
    id: string
    name: string
    description: string
    slug: string
    parent_id: string
  }
  images: [
    {
      url: string
    }
  ]
}

export type CategoryType = {
  id: string
  name: string
  description: string
  parent_id: string
  slug: string
}

export type Category=Database["public"]["Tables"]["categories"]["Row"]

export type Product=Database["public"]["Tables"]["product"]["Row"]
export type Profile=Database["public"]["Tables"]["profile"]["Row"]
export type Addresses=Database["public"]["Tables"]["address"]["Row"]
export type Orders=Database["public"]["Tables"]["orders"]["Row"]
export type OrderItems=Database["public"]["Tables"]["order_items"]["Row"]

// export type Profile=Database["public"]["Tables"]["cart"]["Row"]

