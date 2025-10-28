import { cn } from '@/lib/utils';
import React from 'react'

const DateFormat = ({ date, className }: { date: Date, className?: string }) => {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const formatDate = () => {
        // const date = new Date("2023-03-01T00:00:00.000Z");
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const isMonth = parseInt(month)
        const monthName = monthNames[isMonth];
        // console.log("month: ", monthName);

        const day = date.getDate().toString().padStart(2, '0');
        return `${monthName} ${day}, ${year}`;
    };

    const dateString = formatDate();
    // console.log(dateString);


    return (
        <div className={cn("flex items-center gap-2")}>
            {dateString}
        </div>
    )
}

export default DateFormat