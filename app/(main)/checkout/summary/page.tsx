"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Currency from '@/components/ui/currency'
import { CartItem } from '@/hooks/store/slices/cart-slices'
import { PaymentMethod, ShippingAddress } from '@/hooks/store/slices/checkout'
import { useAppSelector } from '@/hooks/store/store'
import { createClient } from '@/lib/supabase/client'
import { Addresses } from '@/lib/types'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {  useEffect, useState } from 'react'

const SummaryPage = () => {
    const { shippingAddress, paymentMethod } = useAppSelector((state) => state.checkout)
    const { cartItems } = useAppSelector((state) => state.cart.cart)
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [address, setAddress] = useState<Addresses | null>(null)
    // console.log("shippingAddress",shippingAddress)
    // console.log("paymentMethod",paymentMethod)
    
   
    const supabase = createClient()

    useEffect(() => {
        if (shippingAddress.city === "" || shippingAddress.state === "" || shippingAddress.zip_code === "" || shippingAddress.country === "") {
            return router.push("/checkout/address")
        }
        if (paymentMethod.name === "") {
            return router.push("/checkout/paymentMethod")
        }

        async function getUser() {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.log(error)
            } else {
                setUser(data.user)
                return data.user
            }
        }
        getUser()
    }, [])

    // useEffect(() => {
    //     async function getAddress() {
    //         const { data, error } = await supabase.from("address").select("*").eq("user_id", user?.id)
    //         if (error) {
    //             console.log(error)
    //         } else {
    //             setAddress(data.user)
    //         }
    //     }
    //     getAddress()
    // }, [])

    return (<div className='w-full '>

        <div className='flex-1 flex flex-col gap-8 w-full max-w-3xl mx-auto bg-neutral-50 border-2 border-neutral-300 p-5 rounded-lg '>
            <DeliveryAddress shippingAddress={shippingAddress} user={user} />
            <PaymentMethods paymentMethod={paymentMethod} />
            <CartItems cartItems={cartItems} />

        </div>


    </div>
    )
}

export default SummaryPage





const DeliveryAddress = ({ shippingAddress, user }: { shippingAddress?: ShippingAddress, user: User | null }) => {

    // const shippingAddress = {
    //     address: "address",
    //     city: "city",
    //     state: "state",
    //     zip: "zip",
    //     country: "country"
    // }

    return (
        <Card className='w-full max-w-2xl'>
            {
                shippingAddress !== null && <CardHeader className='text-2xl font-bold  flex items-center justify-between  '>
                    <CardTitle>

                        Delivery Address
                    </CardTitle>

                    <Button variant={"outline"} className='w-max cursor-pointer'>
                        <Link href="/checkout/address">
                            Change Address</Link>
                    </Button>

                </CardHeader>
            }

            <CardContent className='flex flex-col gap-2 '>

                <span>{user?.email}</span>
                {
                    shippingAddress !== null && <span className='text-sm font-semibold'>
                        {shippingAddress?.location} {shippingAddress?.city} {shippingAddress?.state} {shippingAddress?.zip_code}{shippingAddress?.country}
                    </span>
                }
                

             
            </CardContent>
        </Card>

    )
}


const PaymentMethods = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
    return (
        <Card className='w-full max-w-2xl'>
            {
                paymentMethod !== null && <CardHeader className='text-2xl font-bold  flex items-center justify-between  '>
                    <CardTitle>
                        Payment Method
                    </CardTitle>

                    <Button variant={"outline"} className='w-max cursor-pointer'>
                        <Link href="/checkout/payment">
                            Change Payment Method</Link>
                    </Button>

                </CardHeader>}
            <CardContent className='flex items-center gap-2 '>
                {
                    paymentMethod.image && <img src={paymentMethod.image} alt='payment method' width={50} height={50}
                        className='w-18 h-14 object-fill rounded-md shadow-md'
                    />
                }  {
                    paymentMethod.name && <span className='text-sm font-semibold'>{paymentMethod.name}</span>
                }
            </CardContent>        </Card>
    )
}


const CartItems = ({ cartItems }: { cartItems: CartItem[] }) => {
    return (
        <Card className='flex-1 w-full max-w-2xl'>
            {
                cartItems.length > 0 && <CardHeader className='text-2xl font-bold  flex items-center justify-between  '>
                    <CardTitle>

                        Your Items to be delivered
                    </CardTitle>

                    <Button variant={"outline"} className='w-max cursor-pointer'>
                        <Link href="/cart">
                            Modify Cart</Link>
                    </Button>

                </CardHeader>
            }
            <CardContent className=' flex flex-wrap items-start  gap-2'>
                {
                    cartItems.map((item: CartItem, index: number) => {
                        return (
                            <div key={index} className='flex flex-col  w-48  h-52 rounded-lg  '>
                                <div className='w-40 h-28'>
                                    <Image src={item.images[0].url} alt='product' width={500} height={500}
                                        className='w-36 h-28 object-cover rounded-md shadow-md'
                                    />
                                </div>

                                <span className='line-clamp-2 text-sm mb-2'> {item.name}</span>
                                <Currency price={item.price} />



                            </div>

                        )
                    })
                }

            </CardContent>
        </Card>
    )
}



