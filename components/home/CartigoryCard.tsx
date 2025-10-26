"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion, MotionProps } from "framer-motion"
const Category = [
    {
        title: "Fashion",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/71qcoYgEhzL._SX3000_.jpg",
    },
    {
        title: "Phone and Tablet",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/71xHyqBwdcL._SX3000_.jpg",
    },
    {
        title: "Laptop and Accessories",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/81hIlE5xocL._SX3000_.jpg",
    },
    {
        title: "Electronics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/619geyiQI5L._SX3000_.jpg",
    },
    {
        title: "Home and Office",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/61Yx5-N155L._SX3000_.jpg",
    },
    {
        title: "Jewelry",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/61Yx5-N155L._SX3000_.jpg",
    },
    {
        title: "Grocery",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/61Yx5-N155L._SX3000_.jpg",
    },

    {
        title: "Sports and Outdoor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/61Yx5-N155L._SX3000_.jpg",
    },
]
const CartigoryCard = () => {

    const productCard: MotionProps = {
        initial: { opacity: 0, scale: 0.5 },
        whileInView: {
            opacity: 1,
            scale: 1,

        },
        transition: {
            type: "spring",
            duration: 0.5,
            delay: 0.5,
            ease: "easeInOut",
            bounce: 0.5,
        },
        viewport: {
            once: true,
            amount: 0.5,
        }
    }

    return (
        <div className='w-full '>
            <div className='grid grid-cols-3  lg:grid-cols-4 gap-10 place-items-center '
            >
                {Category.map((item, index) => (
                    <motion.div
                        {...productCard}



                        key={index}
                        className='w-full space-y-4'>
                        <div className='flex flex-col items-center justify-between'>
                            <h2 className='text-xl mb-4 font-bold'>{item.title}</h2>
                            <div className='flex gap-2'>
                                <Image src={item.image} alt='product' width={500} height={500}
                                    className='w-full h-60 object-cover rounded-md shadow-md'
                                />
                            </div>
                            <Link href="#" className='text-sm mt-2 text-blue-600 hover:text-blue-700 transition-all ease-in-out    duration-300'>
                                View All
                            </Link>
                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    )
}

export default CartigoryCard