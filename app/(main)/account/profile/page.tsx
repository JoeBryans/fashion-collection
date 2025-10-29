import UpdateProfile from '@/components/custom/Profile/UpdateProfile'
import { getUser } from '@/lib/supabase/query'
import { createClient } from '@/lib/supabase/sever'
import { Profile } from '@/lib/types'
import { User } from '@supabase/supabase-js'
import { get } from 'http'
import React from 'react'

const page = async() => {
    const supabase = await createClient()
    const user= await getUser() as User


  const {data, error:err} = await supabase.from('profile').select('*').eq('id', user?.id).single()
  if(err){
      console.log(err)
      return 
  }

    const profile:Profile= data as Profile
//   console.log("res: ", res);
  return (
    <div className='w-full max-w-3xl mx-auto min-h-screen place-content-center'>
        <UpdateProfile profile={profile}/>
    </div>
  )
}

export default page