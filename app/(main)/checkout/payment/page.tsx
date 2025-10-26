"use client"
import { createPaymentMethod } from '@/hooks/store/slices/checkout'
import { useAppDispatch } from '@/hooks/store/store'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaymentMethods = [
  {
    id: 1,
    name: "Paypal",
    description: "Paypal",
    image: "/paypal1.png",
  },
  {
    id: 2,
    name: "Debit Card",
    description: "Debit Card",
    image: "/master-visa-verve.jpg",
  },
  {
    id: 3,
    name: "Opay",
    description: "Opay Transfer",
    image: " /opay.jpg",
  },

  {
    id: 5,
    name: "Pay on Delivery",
    description: "Cash on Delivery",
    image: "/cash.png",
  },
]

interface PaymentMethod {
  name: string
  description: string
  image: string
}

const page = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()

  const NavigateToCheckOut = (payment: PaymentMethod) => {
    console.log("payment: ", payment);

    if (payment !== null || payment !== "" || payment !== undefined) {
      dispatch(createPaymentMethod(payment))
      router.push("/checkout/summary")
    }

  }


  return (
    <div className=' w-full max-w-3xl p-5 '>
      <div className='flex flex-col gap-4 border-2 bg-white  rounded-lg p-4  '>
        {
          PaymentMethods.map((paymentMethod: { id: number, name: string, description: string, image: string }, index: number) => {
            return <div key={paymentMethod.id} className={cn('flex  gap-2  border-b-2 p-2 ',


            )}
              onClick={() => NavigateToCheckOut(paymentMethod)}
            >
              <img src={paymentMethod.image} alt='payment method' width={50} height={50}
                className='w-18 h-14 object-fill rounded-md shadow-md'
              />
              <span>{paymentMethod.name}</span>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default page