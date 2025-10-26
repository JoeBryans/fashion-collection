import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className='w-full flex min-h-screen'>
                <SideBar />
                <main className='flex-1'>
                    <Navbar/>
                    {children}
                </main>
            </div></SidebarProvider>
    )
}

export default layout