import { getAllProducts } from '@/lib/supabase/query'
import { Product } from '@/lib/types';
import React from 'react'
import ProductTable from '../../components/ProductTable';

const page = async() => {
    const products=await getAllProducts() as Product[]
//   console.log("products: ", products);

  return (
    <div className='w-6xl max-w-full mx-auto '>

        <ProductTable products={products} />

    </div>
  )
}

export default page