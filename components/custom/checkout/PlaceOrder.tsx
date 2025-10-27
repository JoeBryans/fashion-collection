"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { usePaystackPayment } from 'react-paystack'
import { PaystackProps } from 'react-paystack/dist/types'

const PlaceOrder = () => {
    const price = 100
    const config: PaystackProps = {
        reference: new Date().getTime().toString(),
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        currency: 'NGN',
        amount: price * 100,
        email: 'shadcn@shadcn.com',


    };
    const onSuccess = (reference) => {
        //  console.log(data);
    }
    const onError = (reference) => {
        //  console.log(error);
    }
    const onClose = (reference) => {
        console.log('closed');
    }

    const initializePayment = usePaystackPayment(config);

    return (
        <div>
            <Button variant={"dark"}
                className='w-full cursor-pointer mt-4'
                onClick={() => initializePayment({ onSuccess, onClose })}
            >
                Place Order
            </Button>

        </div>
    )
}

export default PlaceOrder