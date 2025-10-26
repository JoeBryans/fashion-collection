
import Address from '@/components/custom/address/Address'
import AdressCard from '@/components/custom/address/AdressCard'
import { createClient } from '@/lib/supabase/sever'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

const page = async () => {
  const adress = false
  const supabase = await createClient()
  const { data: user, error } = await supabase.auth.getUser()
  const userInfo = user?.user

  if (error) {
    console.log(error)
  }
  if (userInfo === null) {
    return redirect("/auth/sign-in", RedirectType.push)
    // return redirect("/auth/sign-in", RedirectType.push)
  }

  const { data: address, error: addressError } = await supabase.from('address').select('*').eq('user_id', userInfo?.id)


  console.log(address)

  if (addressError) {
    console.log(addressError)
  }
  if (address === null) {
    return redirect("/address", RedirectType.push)
  }
  return (
    <div> 
      <div>
      <AdressCard address={address} />
    </div>


    </div>
  )
}

export default page