import { createClient } from "@/lib/supabase/sever"
import { NextResponse } from "next/server"
import Paystack from "paystack"

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY!)
export async function GET(request: Request) {
    // const { reference }:{reference:string} = await request.json()
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get('reference')
    console.log("reference: ", reference)

    try {
        const verifyPayment = await paystack.transaction.verify(reference!)

        // console.log(data)

        const supabase = await createClient()
        if (verifyPayment.data.status === 'success') {
            const { data: order, error } = await supabase.from('orders').update({
                payment_status: 'paid',
                order_status: "pending",
                reference: verifyPayment.data.reference,
            }).eq('reference', reference as string).select("*").single()
            if (error) {
                console.log(error)
                return NextResponse.json({ error: error })
            }
            // console.log("order: ", order)
            return NextResponse.json(order)
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }
}