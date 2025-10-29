import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Currency from '@/components/ui/currency';
import DateFormat from '@/components/ui/date-format';
import { getUser } from '@/lib/supabase/query';
import { createClient } from '@/lib/supabase/sever';
import { OrderItems } from '@/lib/types';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import {Share } from 'lucide-react';
import Link from 'next/link';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react'
interface Props {
    params: Promise<{ orderId: string }>

}

const ActionButton = [
    {
        name: "Return",
    },
    {
        name: "Buy",
    }
]

const page: NextPage<Props> = async ({ params }) => {
    const param = await params
    const orderId = param.orderId
    const supabase = await createClient()
    const { data: order, error } = await supabase.from('orders').select(`*,order_items(*,product_id(name,images,price,categoryId(name,slug,parent_id)))`).eq('id', orderId).single()
    if (error) {
        console.log(error)
        return <div className='text-red-500 '>{error.message}</div>
    }

    const user = await getUser() as User
    // console.log("user: ", user);


    return (
        <div className='w-full  my-10 '>
            <div className='flex flex-col w-full max-w-4xl min-w-md gap-4 mx-auto  p-4 '>
                <div className='w-full flex flex-col gap-2 '>
                    <div className='w-full flex items-center justify-between gap-4 '>
                        <span
                            className={cn(
                                "capitalize",
                                order.order_status === "delivered" && "text-green-500", order.order_status === "processing" && "text-orange-500",
                                order.order_status === "pending" && "text-orange-500",
                                order.order_status === "shipped" && "text-green-500",
                                order.order_status === "returned" && "text-red-500",
                            )}
                        >{order.order_status}</span>
                        <Button variant={"secondary"}><Share /> Share </Button>

                    </div>
                    <p className='flex flex-wrap items-center text-sm gap-2'>
                        <span className='text-neutral-600 font-semibold flex items-center '>
                            Order time : <DateFormat date={new Date(order.created_at)} />
                        </span>
                        <span className='text-neutral-600 font-semibold'>Order ID : {order.id}</span>
                    </p>
                </div>

                <div className='w-full flex flex-wrap gap-4 '>
                    <div className='flex flex-col gap-2 '>
                        <span>Shipping to :</span>
                        <p className='flex items-center gap-2'>{user?.user_metadata?.name} {user?.email}</p>
                        <p>{order?.shipping_address?.location}</p>
                        <p>{order?.shipping_address?.city},{order?.shipping_address?.state},{order?.shipping_address?.country}</p>
                        <p>{order?.shipping_address?.location}</p>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <span>Delivery time</span>

                        <p>{order?.order_status === "delivered" ? <div>
                            <span className='capitalize flex gap-2 items-center'>{order.order_status}

                                <DateFormat date={new Date(order.delivered_at)} />
                            </span> on

                        </div> : <span className={cn(
                            "capitalize",
                            order.order_status === "pending" && "text-orange-500",
                            order.order_status === "processing" && "text-orange-500",
                            order.order_status === "shipped" && "text-green-500",

                        )}>{order.order_status}</span>}</p>

                    </div>




                </div>


                <div className='w-full flex items-center justify-between gap-4 '>
                    <div className=" w-full min-h-screen flex flex-col gap-4 ">
                                            {
                            order && order.order_items.map((orderItem: OrderItems) => {
                                return (
                                    <Card
                                        key={orderItem.id}
                                        className=""
                                    >
                                        <CardContent className="flex items-center flex-wrap gap-4 ">
                                            <div className="flex-1 flex  items-center gap-4">
                                               
                                                                <div className="w-28 h-28 flex items-center gap-4">
                                                                    <Image
                                                        src={orderItem.product_id.images[0].url}
                                                        alt={orderItem.product_id.name}
                                                                        width={100}
                                                                        height={100}
                                                                        className="object-cover w-full h-fll"
                                                                    />
                                                                </div>

                                    <div className='flex flex-col gap-2 '>
                                        <span>{orderItem.product_id.name}</span>
                                        <Currency price={orderItem.price} />
                                        <span>{orderItem.quantity} item&apos;s</span>
                                    </div>

                                            </div>


                                            <div className='flex flex-col gap-2 '>
                                                {
                                                    ActionButton.map((action: { name: string }, index: number) => {
                                                        return (
                                                            <Button
                                                                key={index}
                                                                variant={action.name === "Buy" ? "dark" : "secondary"}
                                                                className='w-full cursor-pointer border-2 border-neutral-300 '
                                                            >
                                                                <Link
                                                                    href={`
                                
                                ${action.name === "Buy" ? `/category/${order.order_items[0].product_id.categoryId}` : "#"}
                            `}
                                                                //   className="h-4 w-4" color="white"
                                                                >
                                                                    {action.name}</Link>
                                                            </Button>
                                                        )
                                                    })
                                                }
                                            </div>





                                        </CardContent>

                                    </Card>


                                )
                            })
                        }


                    </div>

                </div>



            </div>

        </div>
    )
}

export default page