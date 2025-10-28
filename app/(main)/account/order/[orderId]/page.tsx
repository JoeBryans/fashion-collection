import React from 'react'
interface Props {
    params: {
        orderId: string,
    }
}
const page =async ({ params }: Props) => {
    const orderId =await params.orderId
    console.log(orderId);

    return (
        <div>page</div>
    )
}

export default page