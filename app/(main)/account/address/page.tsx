import AdressCard from '@/components/custom/address/AdressCard'
import { getAddress } from '@/lib/supabase/query'
import { Addresses } from '@/lib/types'
import React from 'react'

const page = async() => {
    const address=await getAddress() as Addresses[]
    // console.log("address: ", address);
  return (
      <div className='w-full max-w-2xl min-w-md mx-auto my-10'>
        <AdressCard address={address} />
    </div>
  )
}

export default page