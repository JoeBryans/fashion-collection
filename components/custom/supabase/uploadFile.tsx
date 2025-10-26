"use client"
import ButtonLoader from '@/components/ui/button-loader'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/serverFun'
import { cn } from '@/lib/utils'
import { UploadCloud } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface Images {
    url: string
}

const UploadFile = ({  setImageUrl }: {  setImageUrl: React.Dispatch<React.SetStateAction<Images[]>> }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<String>("")
    const sb = supabase()

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList
        const formData = new FormData()

        try {
            setIsLoading(true)
             const uploadImages= await Promise.all(Array.from(files).map(async (file: File) => {
                const filePath = `/product/${file.name}-${Date.now()}`
                const { data, error } = await sb.storage.from("fashion-collection").upload(filePath, file)
                if (error) {
                    console.log(error)
                    toast.error("Error uploading file: " + error.message)
                    return
                }
                 const { data: sbUrl, } =  sb.storage.from("fashion-collection").getPublicUrl(filePath)
                return {url:sbUrl.publicUrl}
            }))
            console.log("uploadImages: ", uploadImages)
            setImageUrl(uploadImages)
            setIsLoading(false)
           
        } catch (err) {
            setIsLoading(false)
            setError(err as string)
            console.log(error)


        } finally {
            setIsLoading(false)
            setError("")

        }
    }

    return (
        <div className='w-full flex flex-col gap-2  '>
            <Label htmlFor='image'
                className={cn(
                    " flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2                              border-dotted border-neutral-400 p-3 text-sm text-neutral-900 relative min-h-28 ",
                    isLoading && "bg-neutral-500/30 cursor-not-allowed"

                )}
            >
                {
                    isLoading ? <div className='absolute top-0 left-0 bottom-0 right-0 animate-pulse flex items-center justify-center gap-2 text-3xl font-semibold text-neutral-50 '>
                        Uploading <ButtonLoader />
                    </div> : <><span>Uplaod Image</span>
                        <UploadCloud />
                        {/* <span>or drag and drop</span> */}
                        <span className='text-xs font-bold'>you can only upload 15 images</span></>
                }

            </Label>

            <span
                className='text-red-500 ttext-sm font-semibold'
            >{error}</span>
            <input type='file' className='hidden' id='image'
                accept="image/*"
                multiple={true}
                max={15}
                disabled={isLoading}
                onChange={handleChange}
            />
            
        </div>
    )
}

export default UploadFile