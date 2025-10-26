import Currency from '@/components/ui/currency'
import { CartItem } from '@/hooks/store/slices/cart-slices'
import Image from 'next/image'
import React from 'react'
import { AddToCartButton, RemoveCartButton } from './cart-buttons'

const CartItems = ({ cartItems }:any) => {
    return (
        <div className='flex-1 block space-y-4'>
            {
                cartItems.map((item: CartItem, index: number) => {
                    return (
                        <div key={index} className='flex flex-col  w-[500px] p-5 h-52 shadow-sm rounded-lg  '>
                            <div key={index} className='flex gap-2  justify-center w-full '>
                                <div className='w-44 h-28'>
                                    <Image src={item.images[0].url} alt='product' width={500} height={500}
                                        className='w-full h-28 object-cover rounded-md shadow-md'
                                    />
                                </div>
                                <div className='w-full px-5 flex flex-col gap-2 '>
                                    <span>{item.name}</span>
                                    <Currency price={item.price} />
                                    <div className='flex items-center gap-2'>
                                        {
                                            item.color !== "" && <span> {item.color}</span>
                                        }
                                        {
                                            item.size !== "" && <span> {item.size}</span>
                                        }
                                    </div>

                                    <AddToCartButton product={item} className="w-max" />


                                </div>

                            </div>
                            <div className='w-full flex gap-4 items-center justify-start'>
                                <RemoveCartButton product={item} className="w-max" />
                            </div>
                        </div>
                    )
                })
            }

        </div>


    )

}




export default CartItems