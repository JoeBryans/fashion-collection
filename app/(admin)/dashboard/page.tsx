import React from 'react'
import Dashboard from '../components/dashboard'
import { dashboardQuery } from '@/lib/supabase/query'
import { Orders } from '@/lib/types'
export type DashboardQuery={
  product:number
  category:number
  order:{
    count:number
    order:Orders[]
  }
  profile:number
  sales:number
}
const page =async () => {
  const query = await dashboardQuery() as DashboardQuery[]
  console.log("query: ", query);
  return (
    <div className='w-full max-w-6xl min-h-screen mx-auto'>
      <Dashboard query = {query}/>
    </div>
  )
}

export default page