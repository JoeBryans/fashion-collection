import React from 'react'
import SideBarAcc from './_sidebar/Sidebar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full min-h-screen flex gap-4 '>
        <div className='w-40'>
              <SideBarAcc/>
        </div>
        <div className='flex-1 '>
              {
                  children
              }
        </div>
        </div>
  )
}

export default layout