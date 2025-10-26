import React from 'react'
import { Summary } from './summary/Summary'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full  '>
            <div className='w-full max-w-6xl flex mx-auto flex-wrap items-start gap-4 p-5 mt-10'>

                <div className='flex-1 '>
                    {children}
                </div>
                <div className='w-64'>
                    <Summary />
                </div>
            </div>
        </div>
    )
}

export default layout