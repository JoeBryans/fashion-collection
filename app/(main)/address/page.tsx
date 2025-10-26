import Address from '@/components/custom/address/Address'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen '>
        <div className='w-full max-w-4xl mx-auto flex-col gap-4 justify-center items-center'>
            <h1 className='text-3xl font-bold text-center'>Craete New Address</h1>

            <Address />

        </div>
    </div>
  )
}

export default page