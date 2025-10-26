import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className='flex items-center justify-center gap-4'>
      <div className='w-8 h-8'>
        {/* <Image src="/logo.jpg" alt="logo" width={100} height={100}
          className='rounded-full'
              /> */}

      </div> <h1 className='text-xl md:text-2xl font-bold'>Jb-collections</h1>
    </Link>
  )
}

export default Logo