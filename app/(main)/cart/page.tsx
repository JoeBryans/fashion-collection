"use client"

import CartItems from '@/components/custom/Cart/CartItems'
import { Button } from '@/components/ui/button'
import Currency from '@/components/ui/currency'
import { useAppSelector } from '@/hooks/store/store'
import Link from 'next/link'
import React from 'react'

const CartPage = () => {
    const carts = useAppSelector((state) => state.cart.cart)
    const cartQuantity = carts.totalQuantity
    const cartTotalPrice = carts.totalPrice
    // const cartItems:any = carts.cartItems


    return (
        <div className='w-screen min-h-screen my-20'>
            <div className='w-full   max-w-4xl mx-auto'>
                {carts.cartItems
                    .length > 0 ? (
                    <div className='flex flex-wrap gap-4 px-4  '>

                        <CartItems cartItems={carts.cartItems
                        } />
                        <div className='w-full max-w-72 p-5 shadow h-max rounded-md space-y-2 '>
                            <h1 className='text-xl font-semibold text-center'>Cart Summary</h1>

                            <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                                <span>Total Item(s)</span>
                                <span>{carts.totalQuantity}</span>
                            </div>
                            <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                                <span>Shipping Cost</span>
                                <Currency price={3000} />
                            </div>
                            <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                                <span>Sub Total</span>
                                <Currency price={carts.totalQuantity} />
                            </div>
                            <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                                <span>Total</span>
                                <Currency price={carts.totalQuantity + 3000} />
                            </div>

                            <Button
                                variant="outline"
                                className="w-full mt-4 cursor-pointer"
                            >
                                <Link href="/checkout/summary">Checkout</Link>
                            </Button>


                        </div>
                    </div>
                ) : (<div className='w-96 mx-auto flex flex-col gap-4 items-center justify-center shadow rounded-lg p-5 '>
                    <h1 className='text-2xl font-semibold'>Your cart is empty</h1>
                    <span> You can add items to your cart from the shopping page</span>
                    <Button
                        variant="dark"
                        className="w-max cursor-pointer"
                    >
                        <Link href="/">Go for shopping</Link>
                    </Button>
                </div>)}

            </div>
        </div>
    )
}

export default CartPage