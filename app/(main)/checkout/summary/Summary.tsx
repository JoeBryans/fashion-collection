"use client"
import PlaceOrder from "@/components/custom/checkout/PlaceOrder"
// import PlaceOrder from "@/components/custom/checkout/PlaceOrder"
import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Currency from "@/components/ui/currency"
import { useAppSelector } from "@/hooks/store/store"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const Summary = () => {
    const { totalPrice, totalQuantity,cartItems } = useAppSelector((state) => state.cart.cart)
    const {paymentMethod, shippingAddress}=useAppSelector((state) => state.checkout)
    const shipping_cost=15

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handelCheckout=async ()=>{
    try {
        setIsLoading(true)
        const result=await fetch(`/api/orders`
            ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_items: cartItems,
                    items_quantity:totalQuantity ,
                    total_price: totalPrice+shipping_cost,
                    shipping_address:shippingAddress,
                    payment_method: paymentMethod.name,
                })
            }
        )
        const data=await result.json()
        if(result.ok){
            setIsLoading(false)
            localStorage.removeItem("cart")
            localStorage.removeItem("shippingAddress")
            localStorage.removeItem("paymentMethod")

            toast.success("Order Placed Successfully")
            router.push(`${data.data}`)

        }else{
            setIsLoading(false)
            toast.error("Order Placed Failed: ")
        }
    } catch (error) {
        console.log(error)
        setIsLoading(false)
        toast.error("error: "+error)
        return 
        
    }
        
    }
    return (
        <Card>
            <CardHeader className='text-2xl font-semibold line-clamp-2 '>Order Summary</CardHeader>
            <CardContent className='flex flex-col gap-2 '>
                <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                    <span>Total Item(s)</span>
                    <span>{totalQuantity}</span>
                </div>
                <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                    <span>Shipping Cost</span>
                    <Currency price={shipping_cost} />
                </div>
                <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                    <span>Sub Total</span>
                    <Currency price={totalPrice} />
                </div>
                <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                    <span>Total</span>
                    <Currency price={ totalPrice+shipping_cost} />
                </div>
    <Button variant={"dark"}
            className='w-full cursor-pointer mt-4'
                onClick={handelCheckout}
        >
            Place Order{
                isLoading && <ButtonLoader/>
            }
        </Button>                
        {/* <PlaceOrder /> */}
            </CardContent>
        </Card>

    )
}