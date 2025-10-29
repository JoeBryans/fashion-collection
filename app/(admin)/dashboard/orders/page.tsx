import { getAllOrders } from '@/lib/supabase/query'
import { Orders } from '@/lib/types'
import React from 'react'
import OrderTable from '../../components/OrderTable'

const page = async () => {
    const allOrders = await getAllOrders() as Orders[]

    // console.log("allOrders: ", allOrders);
    return (
        <div className='w-6xl max-w-full mx-auto '>
            <OrderTable orders={allOrders} />
        </div>
    )
}

export default page