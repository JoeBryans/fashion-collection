
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import DateFormat from '@/components/ui/date-format'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrderItems, Orders } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const orderCategory = [
    "All Orders",
    "Delived",
    "Processing",
    "Shipped",
    "Returned",


]

const ActionButton = [
    {
        name: "Return",
    },
    {
        name: "Buy",
    }
]

const OrderItem = async ({ orders }: { orders: Orders[] }) => {




    const Returned = orders?.filter((order: Orders) => order.order_status === "returned")
    const Processing = orders?.filter((order: Orders) => order.order_status === "processing")
    const Delivered = orders?.filter((order: Orders) => order.order_status === "delivered")
    const shipped_orders = orders?.filter((order: Orders) => order.order_status === "shipped")



    // const delivered_at = formatDate(Delivered[0].delivered_at)
    // console.log("delivered: ",delivered_at);


    return (
        <div className="flex w-full min-w-md max-w-4xl min-h-screen flex-col gap-6 p-5 mx-auto">
            <Tabs defaultValue="All Orders"
            >
                <TabsList className='w-full flex items-center'>
                    {
                        orderCategory.map((category: string, index: number) => {
                            return (
                                <TabsTrigger key={index} value={category}>{category}</TabsTrigger>
                            )
                        })
                    }

                </TabsList>
                <TabsContent value="All Orders">
                    <div className=" w-full min-h-screen flex flex-col gap-4 ">
                        {
                            orders && orders.map((order: Orders) => {
                                return (
                                    <Card
                                        key={order.id}
                                        className=""
                                    >
                                        <CardHeader className='flex items-center justify-between '>
                                            <CardTitle
                                                className='flex items-center gap-2 font-semibold text-lg capitalize '
                                            >{order.order_status === "delivered" ? (
                                                <div className='flex items-center gap-2 text-green-700 font-semibold text-lg capitalize '>
                                                    {order.order_status} on                      <DateFormat date={new Date(order.delivered_at)} />
                                                </div>
                                            ) : <span
                                                className={cn(
                                                    order.order_status === "processing" && "text-orange-500",
                                                    order.order_status === "pending" && "text-orange-500",
                                                    order.order_status === "shipped" && "text-green-500",
                                                    order.order_status === "returned" && "text-red-500",
                                                )}
                                            >{order.order_status}</span>
                                                }
                                            </CardTitle>

                                            <Link href={`/account/order/${order.id}`} className='flex items-center gap-4 text-neutral-900 font-semibold text-lg underline underline-offset-4 '>
                                                <span>View Order</span>
                                                <ChevronRightIcon className='h-4 w-4' />
                                            </Link>
                                        </CardHeader>
                                        <CardContent className="flex items-center flex-wrap gap-4 ">
                                            <div className="flex-1 flex overflow-auto scrollbar-hide  items-center gap-4">
                                                {
                                                    order.order_items.map((item: OrderItems) => {
                                                        return (

                                                            <div key={item.id} className="flex items-center  gap-4">
                                                                <div className="w-28 h-28 flex items-center gap-4">
                                                                    <Image
                                                                        src={item.product_id.images[0].url}
                                                                        alt={item.product_id.name}
                                                                        width={100}
                                                                        height={100}
                                                                        className="object-cover w-full h-fll"
                                                                    />
                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }

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
                                
                                ${action.name === "Buy" ? `/product?name=${order.order_items[0].product_id.name}}` : "#"}
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
                                        <CardFooter className='flex gap-4 px-5 justify-end items-center text-neutral-600 text-sm'>
                                            <span> {order.total_quantity}   Item&apos;s</span>
                                            
                                            <span>Price : {order.total_price}</span>
                                            <DateFormat date={new Date(order.delivered_at)} />
                                            <span>Order ID : {order.id}</span>

                                        </CardFooter>
                                    </Card>


                                )
                            })
                        }


                    </div>
                </TabsContent>
                <TabsContent value="Delived">
                    <div className=" w-full min-h-screen flex flex-col gap-4 ">
                        {/* <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you&apos;re
                                    done.
                                </CardDescription>
                            </CardHeader> */}

                        {
                            Delivered && Delivered.map((order: Orders) => {
                                return (
                                    <Card
                                        key={order.id}
                                        className=""
                                    >
                                        <CardHeader className='flex items-center justify-between '>
                                            <CardTitle
                                                className='flex items-center gap-2 text-green-700 font-semibold text-lg capitalize '
                                            >{order.order_status} on                      <DateFormat date={new Date(order.delivered_at)} />
                                            </CardTitle>

                                            <Link href={`/account/order/${order.id}`} className='flex items-center gap-4 text-neutral-900 font-semibold text-lg underline underline-offset-4 '>
                                                <span>View Order</span>
                                                <ChevronRightIcon className='h-4 w-4' />
                                            </Link>
                                        </CardHeader>
                                        <CardContent className="flex items-center flex-wrap gap-4 ">
                                            <div className="flex-1 flex  items-center gap-4">
                                                {
                                                    order.order_items.map((item: OrderItems) => {
                                                        return (

                                                            <div key={item.id} className="flex items-center flex-wrap gap-4">
                                                                <div className="w-28 h-28 flex items-center gap-4">
                                                                    <Image
                                                                        src={item.product_id.images[0].url}
                                                                        alt={item.product_id.name}
                                                                        width={100}
                                                                        height={100}
                                                                        className="object-cover w-full h-fll"
                                                                    />
                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }

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
                                        <CardFooter className='flex gap-4 px-5 justify-end items-center text-neutral-600 text-sm'>
                                            <span> {order.total_quantity}Item&apos;s</span>
                                            <span>Price : {order.total_price}</span>
                                            <DateFormat date={new Date(order.delivered_at)} />
                                            <span>Order ID : {order.id}</span>

                                        </CardFooter>
                                    </Card>


                                )
                            })
                        }


                    </div>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you&apos;ll be logged
                                out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">

                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>)
}

export default OrderItem