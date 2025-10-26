"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion} from "framer-motion"
import { ProductType } from '@/lib/types'
import { getSigleCategoryProduct } from '@/lib/supabase/query'

const Category = () => {
    const [categories, setCategories] = React.useState<ProductType[]>([])


    React.useEffect(() => {
       async function fetchCategories() {
           const result: any = await getSigleCategoryProduct()
           setCategories(result)
        }
        fetchCategories()
    }, [])
    return (
        <div className='w-full relative mt-5'>
            <motion.div 
             initial={{scale:0,opacity:0}}
                animate={{
                    scale:1, opacity:1,
                transition:{
                    duration: 2.5,
                    ease: "easeInOut"
                }
             }}
            className='w-full max-w-2xl mx-auto px-5 flex items-center gap-4 justify-center'>
                {
                    categories.map((product:ProductType) => {
                        return (
                            <Link
                                href={`/category/${product.categoryId.slug}`}
                                key={product.id} className='w-20 h-20  text-center'>
                                <Image src={product.images[0].url} alt={product.categoryId.name}
                                    width={500} height={500}
                                    className='w-full h-full object-cover rounded-full shadow-md dark:shadow-gray-500/50 bg-white dark:bg-gray-900' />

                                    <span className='text-center'>{product.categoryId.name}</span>
                            </Link>
                        )
                    })
                }
            </motion.div>

        </div>
    )
}

export default Category