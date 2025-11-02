import Logo from '@/components/header/Logo'
import React from 'react'

const QuikLinks=[
    {
        title:"categories",
        href:"/category"
    },
    {
        title:"products",
        href:"/products"
    },
    {
        title:"about",
        href:"/about"
    },
    {
        title:"contact",
        href:"/contact"
    },
    
]

const Footer = () => {
  return (
    <div className='w-full  flex flex-col items-center gap-10 bg-neutral-900 p-5 '>
        <div className="w-full max-w-6xl flex items-center justify-between mx-auto">
              <span className='flex items-center text-neutral-50 font-semibold'>JB
              <span className='text-sm mt-1'>collection</span>  
            </span>
              <span className='text-neutral-50 font-semibold text-sm'>Copyright © 2023 Jbcollection. All rights reserved.</span>
         
        </div>
        
    </div>
  )
}

export default Footer