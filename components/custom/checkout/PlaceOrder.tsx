"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

const PlaceOrder = () => {
    return (
        <div><Button variant={"dark"}
            className='w-full cursor-pointer mt-4'
        >
            Place Order
        </Button></div>
    )
}

export default PlaceOrder