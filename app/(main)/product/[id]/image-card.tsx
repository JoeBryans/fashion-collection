"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
const ImageCard = ({ images }: any) => {
    const [imageIndex, setImageIndex] = React.useState(0)

 const handChangeImage=({index,type}:{index:number,type:string})=>{
    if(type==="next"){
        if(index===images.length-1){
            return
        }
        setImageIndex(index+1)
    }else{
        if(index===0){
            return
        }
        setImageIndex(index-1)
    }
 }
    return (
        <div className='w-full mx-auto max-w-xl border-2 border-neutral-300 rounded-lg p-2'>
            <div className='w-full h-96'>
                <Image src={images[imageIndex].url} alt='product' width={500} height={500}
                    className='w-full h-full object-fill rounded-md '
                />
                
            </div>
            <div className='flex gap-2 items-center justify-center mt-4 overflow-x-auto scrollbar-hide px-4 '>
                {images.map((image: { url: string }, index: number) => {
                    return <Image src={image.url} 
                    key={index}
                    alt='product' width={500} height={500}
                        className='w-44 h-24  object-fill rounded-md '
                        onClick={() => {
                            setImageIndex(index)
                        }}
                    />
                })
            }
            </div>
            {/* <Button variant={"default"}
                onClick={() => handChangeImage({index:imageIndex,type:"prev"})}
            >
                Prev
            </Button>
            <Button variant={"default"}
                onClick={() => handChangeImage({index:imageIndex,type:"next"})}
            >
                Next
            </Button> */}
        </div>)
}

export default ImageCard