import { Orders } from '@/lib/types';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    searchParams: Promise<{
        trxref: string,
        reference: string,
    }>
}
const page:NextPage<Props> = async ({ searchParams }) => {
    const param = await searchParams
    const reference = param.reference;
    const verfy = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/paystack/verify?reference=${reference}`)
    const order: Orders = await verfy.json()
    // console.log("data: ", order);

    if (verfy.ok) {
        return redirect(`/account/order/${order.id}`)
    }

    // const data = await verfy.json()
    // console.log(verfy);
    return (
        <div>page</div>
    )
}

export default page