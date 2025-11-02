"use client"
import { Product } from '@/lib/types'
import React from 'react'
import { motion, MotionProps } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import Currency from '../ui/currency'
import { AddToCartButton } from '../custom/Cart/cart-buttons'
import { Badge } from '../ui/badge'

export const ProductCard = ({ products }: { products: Product[] }) => {
    // console.log("pro: ", products);


    const productCard: MotionProps = {
        initial: { opacity: 0, scale: 0.5 },
        whileInView: {
            opacity: 1,
            scale: 1,

        },
        transition: {
            type: "spring",
            duration: 0.5,
            delay: 0.5,
            ease: "easeInOut",
            bounce: 0.5,
        },
        viewport: {
            once: true,
            amount: 0.5,
        }
    }
    return (
        <div className='w-full md:px-2  space-y-4 '>
            <h1 className='w-full max-w-6xl mx-auto text-xl font-semibold'>All Products</h1>
            {/* <div className='w-max max-w-7xl flex '> */}
            <div className='w-full max-w-7xl overflow-auto mx-auto flex gap-2 items-center scrollbar-hide'
            >
                {products && products.slice(0, 30).map((product: Product, index: number) => (
                    <motion.div
                        {...productCard}



                        key={index}
                        className='w-full space-y-4 max-w-64 h-max mx-auto'>
                        <div className='flex flex-col items-center justify-between hover:border-2 border-neutral-300 rounded-md p-2 gap-4 group transition-all duration-200 ease-in-out'>

                            <div className='relative w-60 flex gap-2'>
                                <Image src={product.images[0].url} alt='product' width={500} height={500}
                                    priority={true}
                                    className='w-full h-60 object-cover rounded-md shadow-md'
                                />

                               
                            </div>

                            <div className='w-full px-2 block space-y-2 '>
                                <span>{product.categoryId.name}</span>
                                <Link href={`/product/${product.id}`} >
                                    <h2 className='font-semibold line-clamp-1'>{product.name}</h2></Link>

                                <div className='flex gap-2 items-center overflow-x-auto scrollbar-hide'>
                                    <Currency price={product.discount} />
                                    <Currency price={product.price}
                                        className='line-through hidden group-hover:block transition-all ease-in-out duration-300'
                                    />


                                </div>
                            </div>
                            <AddToCartButton product={product} />

                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    )
}




export const LatestProducts=({products}:{products:Product[]})=>{

    const productCard: MotionProps = {
        initial: { opacity: 0, scale: 0.5 },
        whileInView: {
            opacity: 1,
            scale: 1,

        },
        transition: {
            type: "spring",
            duration: 0.5,
            delay: 0.5,
            ease: "easeInOut",
            bounce: 0.5,
        },
        viewport: {
            once: true,
            amount: 0.5,
        }
    }
    return (
        <div className='w-full md:px-2  space-y-4 '>
            <h1 className='w-full max-w-6xl mx-auto text-xl font-semibold'>Latest Products</h1>
            {/* <div className='w-max max-w-7xl flex '> */}
            <div className='w-full max-w-7xl overflow-auto mx-auto flex gap-2 items-center scrollbar-hide'
            >
                {products && products.slice(0, 30).map((product: Product, index: number) => (
                    <motion.div
                        {...productCard}



                        key={index}
                        className='w-full space-y-4 max-w-64 h-max mx-auto'>
                        <div className='flex flex-col items-center justify-between hover:border-2 border-neutral-300 rounded-md p-2 gap-4 group transition-all duration-200 ease-in-out'>

                            <div className='relative w-60 flex gap-2'>
                                <Image src={product.images[0].url} alt='product' width={500} height={500}
                                    priority={true}
                                    className='w-full h-60 object-cover rounded-md shadow-md'
                                />

                                <Badge className="absolute top-2 right-2 p-1 text-xs text-white bg-neutral-900 rounded-md">
                                    New
                                </Badge>
                            </div>

                            <div className='w-full px-2 block space-y-2 '>
                                <span>{product.categoryId.name}</span>
                                <Link href={`/product/${product.id}`} >
                                    <h2 className='font-semibold line-clamp-1'>{product.name}</h2></Link>

                                <div className='flex gap-2 items-center overflow-x-auto scrollbar-hide'>
                                    <Currency price={product.discount} />
                                    <Currency price={product.price}
                                        className='line-through hidden group-hover:block transition-all ease-in-out duration-300'
                                    />


                                </div>
                            </div>
                            <AddToCartButton product={product} />

                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    )
}