import { NextPage } from 'next';
import React from 'react'
interface Props {
    params: Promise<{ orderId: string }>

}
const page: NextPage<Props> = async ({ params }) => {
    const param = await params
    const orderId = param.orderId
    console.log(orderId);

    return (
        <div>page</div>
    )
}

export default page