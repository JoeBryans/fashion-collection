import { Product,  } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Currency from '../ui/currency'
import { Button } from '../ui/button'

const RelateProducts = ({ relatedProduct }: { relatedProduct: Product[]}) => {
    return (
        <div className='w-full px-5  mt-10 '>
            <h1 className='text-2xl font-bold line-clamp-2 mx-auto '>You May Also Like</h1>
            <div className='w-full max-w-7xl  mx-auto flex flex-wrap gap-8 p-4 items-start justify-start '>
            
                {relatedProduct && relatedProduct.map((product: Product, index: number) => (
                    <div



                        key={index}
                        className='w-full space-y-4 max-w-xs '>
                        <div className='flex flex-col items-center justify-between hover:border-2 border-neutral-300 rounded-md p-2 gap-4 group transition-all duration-200 ease-in-out'>

                            <div className='flex gap-2'>
                                <Image src={product.images[0].url} alt='product' width={500} height={500}
                                    className='w-full h-60 object-cover rounded-md shadow-md'
                                />
                            </div>

                            <div className='w-full px-5 block space-y-2 '>
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
                            <Button variant={"dark"}
                                className='w-full cursor-pointer'
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default RelateProducts