import { AddToCartButton } from '@/components/custom/Cart/cart-buttons'
import SideFilter from '@/components/custom/Category/SideFilter'
import Currency from '@/components/ui/currency'
import { getDescendantCategoryIds } from '@/lib/supabase/query'
import { createClient } from '@/lib/supabase/sever'
import {  Category, Product,  } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const page = async({ params }: { params: Promise<{ slug: string[]}> } ) => {

  const { slug } = await params
  console.log("slug: ",slug);
  
  const arraySlug = slug
  console.log("arraySlug: ", arraySlug );



  const supabase = await createClient()
  let category:Category[] =[]
  let parentId:string=""
 for (const slug of arraySlug) {
   console.log("slug: ", slug);

   let query =supabase
     .from("categories")
     .select("id, name,slug, parent_id")
     .eq("slug", slug)
     .limit(1) // 👈 prevents multiple matches


   if (parentId === null || parentId === "" || parentId === undefined) {
     query = query?.is("parent_id", null);
   } else {
     query = query?.eq("parent_id", parentId);
   }
   const { data, error } = await query.maybeSingle();

  //  category = data;
  const result: Category = data
   parentId = result?.id; // move deeper
  //  console.log("category: ", data);
   category = result
   //  return data
  }
  console.log("category: ", category);

  const categoryId = await getDescendantCategoryIds(category?.id)
  // console.log("categoryId: ", categoryId);

  const { data: products, error: prodError } = await supabase
    .from("product")
    .select(`
      *,
      category:categoryId ( id, name, slug )
    `).in("categoryId", categoryId!);

  // console.log("result: ", products);

  return (
    <div className='w-full flex gap-4 md:flex-row flex-col'>
      <div className='w-64'>
        <SideFilter />
      </div>

      <div className='flex-1'>
        <ProductCard products={products} />
      </div>

    </div>
  )
}

export default page



const ProductCard = ({ products }: { products: Product[] }) => {
  return (
    <div className='w-full px-5  mt-10 '>
      <h1 className='text-2xl font-bold line-clamp-2 mx-auto '>You May Also Like</h1>
      <div className='w-full max-w-7xl  mx-auto flex flex-wrap gap-8 p-4 items-start justify-start '>

        {products && products?.map((product: ProductType, index: number) => (
          <div



            key={index}
            className='w-full space-y-4 max-w-64 '>
            <div className='flex flex-col items-center justify-between hover:border-2 border-neutral-300 rounded-md p-2 gap-4 group transition-all duration-200 ease-in-out'>

              <div className='w-60 flex gap-2'>
                <Image src={product.images[0].url} alt='product' width={500} height={500}
                  className='w-full h-60 object-cover rounded-md shadow-md'
                />
              </div>

              <div className='w-full px-2 block space-y-2 '>
                <span>{product.categoryId.name}</span>
                <Link href={`/product/${product.id}`} >
                  <h2 className='font-semibold line-clamp-1'>{product.name}</h2></Link>

                <div className='flex gap-2 items-center flex-wrap '>
                  <Currency price={product.discount} />
                  <Currency price={product.price}
                    className='line-through hidden group-hover:block transition-all ease-in-out duration-300'
                  />


                </div>
              </div>
              < AddToCartButton product={product} />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}