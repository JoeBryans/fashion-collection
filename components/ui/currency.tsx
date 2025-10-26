import { cn } from '@/lib/utils'
import React from 'react'

const Currency = ({ price,className}: { price: number, className?: string }) => {
    const currency =price.toLocaleString(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
        },
    )
    return <span className={cn('text-blue-700 font-semibold ', className)}>{currency}</span>
}

export default Currency