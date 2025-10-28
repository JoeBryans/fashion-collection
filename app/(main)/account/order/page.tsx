import React from 'react'
import { createClient } from '@/lib/supabase/sever'
import { User } from '@supabase/supabase-js'
import { Orders } from '@/lib/types'
import OrderItems from '@/components/custom/Order/OrderItem'


const page = async () => {
    const supabase = await createClient()
    const { data: user, error } = await supabase.auth.getUser()
    const Userinfo: User | null = user?.user
    const user_id = Userinfo!.id

    const { data: orders, error: err } = await supabase.from('orders').select(`*,order_items(*,product_id(name,images,price,categoryId(name,slug,parent_id)))`).eq('user_id', user_id)

    // console.log("orders: ", orders);
    const order = Array.isArray(orders) ? orders : []

    return (
        <div className='w-full'>
            <OrderItems orders={order} />

        </div>
    )
}

export default page