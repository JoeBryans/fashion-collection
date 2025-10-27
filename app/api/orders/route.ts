import { createClient } from "@/lib/supabase/sever";
import { OrderItems, Orders } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import PayStack from "paystack"

interface OrderBody {
    items_quantity: number
    total_price: number
    shipping_address: {
        location: string
        city: string
        state: string
        zip_code: string
        country: string
    }

    payment_method: string
    order_items: OrderItems[]
}
interface  orderPayload  {
    user_id: string,
    total_quantity: number,
    total_price: number,
    order_status:string,
    payment_method: string,
    payment_status: string,
    shipping_address: {
        location: string
        city: string
        state: string
        zip_code: string
        country: string
    },
}
interface ItemsPayload {
    order_id: string
    product_id: string
    quantity: number
    price: number
}

const paystack = PayStack(process.env.PAYSTACK_SECRET_KEY!
)

export async function POST(request: NextRequest) {
    const body: OrderBody = await request.json()
    // console.log("body: ", body);
    const { order_items, items_quantity, total_price, shipping_address, payment_method } = body
    const supabase = await createClient()

    console.log("paystack: ", paystack);
 

    try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
            console.log(error)
            return NextResponse.json({ error: error.message }, { status: 401 });

        }
        const userInfo: User | null = data?.user
        const user_id = userInfo?.id
        // console.log("userInfo: ", userInfo);
      

        const { data: orders, error: err } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: user_id,
                    total_quantity: items_quantity,
                    total_price: total_price,
                    order_status: "pending",
                    payment_method: payment_method,
                    payment_status: "unpaid",
                    shipping_address: shipping_address,
                }
            ])
            .select('*')
            .single()
        console.log("orders: ", orders);
        if (err) {
            console.log(err)
       return NextResponse.json({ error: err.message }, { status: 401 });

        }
        const order: Orders = orders
        const order_id = order?.id
        // console.log("order: ", order);
        const Items = order_items.map((item: OrderItems) => {
            return {
                order_id: order.id,
                product_id: String(item.id),
                quantity: item.quantity,
                price: item.price,
                // sub_total:item.sub_total,
            }

        })  as ItemsPayload[]
           console.log("items: ",Items);


        const { data: order_item, error: err1 } = await supabase.from('order_items').insert(Items).select('*')
        console.log("order_item: ", order_item);
        if (err1) {
            console.log(err1.message)
            return NextResponse.json({ error: err1.message }, { status: 401 });

        }
       
        // console.log("item: ", items);

        const payment = await paystack.transaction.initialize({
            amount: total_price,
            currency: "NGN",
            description: "Order Placed",
            reference: Date.now().toString(),
            email: userInfo.email!,
            name: userInfo.user_metadata?.name,
            metadata: {
                orderId: order_id,
                items_quantity: items_quantity,
                total_price: total_price,
                shipping_address: shipping_address,
                payment_method: payment_method,
            },
        })

        console.log("payment: ", payment);


        return NextResponse.json({ data: payment.data.authorization_url })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })

    }
}