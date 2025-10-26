"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Currency from "@/components/ui/currency"
import { useAppSelector } from "@/hooks/store/store"

export const Summary = () => {
    const { totalPrice, totalQuantity } = useAppSelector((state) => state.cart.cart)
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
                    <Currency price={totalPrice} />
                </div>
                <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                    <span>Sub Total</span>
                    <Currency price={totalQuantity} />
                </div>
                <div className='flex items-center justify-between border-b-2 border-neutral-300 py-1.5 '>
                    <span>Total</span>
                    <Currency price={totalQuantity + totalPrice} />
                </div>
                <Button variant={"dark"}
                    className='w-full cursor-pointer mt-4'
                >
                    Place Order
                </Button>
            </CardContent>
        </Card>

    )
}