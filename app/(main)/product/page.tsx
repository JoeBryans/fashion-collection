import SideFilter from '@/components/custom/Category/SideFilter'
import Products from '@/components/custom/products/Products'
import { FilterProducts } from '@/lib/supabase/query'
import { Product } from '@/lib/types'
import { NextPage } from 'next'
import React from 'react'
import { int } from 'zod'
interface SearchParams{
  slug: string
  id: string
  category: string
  size: string
  minPrice: string
  maxPrice: string
  color: string
  brand: string
  stockQty: string
  page: string
  perPage: string
  sort: string
}
type Props={
    searchParams: Promise<SearchParams>
}
const page:NextPage<Props> = async ({ searchParams }: Props) => {
  const searchParam = await searchParams
  // console.log("searchParams: ", await searchParams);
  const product = await FilterProducts(searchParam)
  const products = Array.isArray(product) ? product : []
  console.log("result: ", products);



  return (
    <div className='w-full flex gap-4 sm:flex-row flex-col'>
      <div className='w-64'>
        <SideFilter searchParams={searchParam} />
      </div>
      <div className='flex-1 '>
        <Products products={products} />
      </div>

    </div>
  )
}

export default page