import { ProductType } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Currency from '@/components/ui/currency'
import { AddToCartButton } from '../Cart/cart-buttons'

const Products = ({ products }: { products: ProductType[] }) => {

    return (
        <div className='w-full  px-2 '>
            <div className='w-full max-w-7xl  mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center '
            >
                {products && products.map((product: ProductType, index: number) => (
                    <div




                        key={index}
                        className='w-full space-y-4 max-w-64 h-max mx-auto'>
                        <div className='flex flex-col items-center justify-between hover:border-2 border-neutral-300 rounded-md p-2 gap-4 group transition-all duration-200 ease-in-out overflow-hidden'>

                            <div className='w-60 flex gap-2'>
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
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Products