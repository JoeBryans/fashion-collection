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