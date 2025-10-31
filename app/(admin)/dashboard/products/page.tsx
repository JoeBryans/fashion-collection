import { FilterProducts, getAllProducts } from '@/lib/supabase/query'
import { Product } from '@/lib/types';
import React from 'react'
import ProductTable from '../../components/ProductTable';
import { NextPage } from 'next';

type Props={
   searchParams:Promise<{
    q:string
    page:string
    brand:string
    color:string
    size:string

   }>
}

const page:NextPage<Props>= async({searchParams}:Props) => {
  const searchParam = await searchParams
    const products=await getAllProducts() as Product[]
    const  response=await FilterProducts(searchParam) 
    const{count,page,totalPage}=response!
    const filterProducts=response!.result as Product[]

  // console.log("products: ", filterProducts);

  return (
    <div className='w-6xl max-w-full mx-auto '>

      <ProductTable products={filterProducts}
        count={count}
        page={page}
        totalPage={totalPage}
        searchParam={searchParam}
      />

    </div>
  )
}

export default page