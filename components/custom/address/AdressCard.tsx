"use client"
import { Checkbox } from '@/components/ui/checkbox'
import { createAdresse } from '@/hooks/store/slices/checkout'
import { useAppDispatch } from '@/hooks/store/store'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
interface Adress {
    id: string
    user_id: string
    location: string
    city: string
    state: string
    zip_code: string
    country: string
}
const AdressCard = ({ address }: { address: Adress[] }) => {
    const [selectedAddress, setSelectedAddress] = React.useState<Adress | null>(null)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handelSelectAddress = (address: Adress) => {
        setSelectedAddress(address)
        dispatch(createAdresse(address))
        router.push(`/checkout/summary`)

    }

    return (
        <div className=' w-full max-w-3xl p-5 '>
            <div className='flex flex-col gap-4 border-2 bg-white  rounded-lg p-4  '>
                {
                    address.map((address: Adress) => {
                        return (
                            <div key={address.id} className={cn('flex  gap-2  border-b-2 p-2 ',
                                selectedAddress?.id === address.id ? 'border-2 rounded-lg' : 'bg-white text-neutral-800'

                            )}
                                onClick={() => handelSelectAddress(address)}
                            >
                                <Checkbox className='w-5 h-5'
                                    checked={selectedAddress?.id === address.id}
                                />
                                <div>

                                    <p className='text-sm'>
                                        Location:  {address.location}</p>
                                    <p className='text-sm'>
                                        City: {address.city}</p>
                                    <p className='text-sm'>
                                        State: {address.state}</p>
                                    <p className='text-sm'>
                                        Country: {address.country}</p>
                                    <p className='text-sm'>
                                        Zip Code: {address.zip_code}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AdressCard