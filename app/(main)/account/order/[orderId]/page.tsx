import React from 'react'
interface Props {
    params: {
        orderId: string,
    }
}
const page = ({ params }: Props) => {
    const orderId = params.orderId
    console.log(orderId);

    return (
        <div>page</div>
    )
}

export default page