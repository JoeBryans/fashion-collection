import { getAllOrders } from '@/lib/supabase/query'
import { Orders } from '@/lib/types'
import React from 'react'
import OrderTable from '../../components/OrderTable'
import { NextPage } from 'next'
import Pagination from '../../components/pagination'

type Props={
   searchParams:Promise<{
    q:string
    page:string
    brand:string
    color:string
    size:string

   }>
}

interface OrdersFilter{
    result:Orders[]
    count:number
    page:number
    totalPage:number
}

const page:NextPage<Props>= async ({ searchParams }:Props) => {
    const searchParam = await searchParams
    const allOrders = await getAllOrders(searchParam) as OrdersFilter
    const{count,page,totalPage}=allOrders
    const filterOrders = allOrders?.result

    console.log("allOrders: ", allOrders);
    return (
        <div className='w-6xl max-w-full mx-auto flex flex-col gap-4 items-start '>
            <OrderTable orders={filterOrders}
                count={count}
                page={page}
                totalPage={totalPage}
                searchParam={searchParam}
            />
            <Pagination page={page} totalPage={totalPage}/>
        </div>
    )
}

export default page