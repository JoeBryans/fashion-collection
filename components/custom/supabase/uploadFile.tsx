"use client"
import { ProductForm } from '@/app/(admin)/dashboard/new-products/page'
import ButtonLoader from '@/components/ui/button-loader'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/serverFun'
import { cn } from '@/lib/utils'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FieldValue, FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

interface Images {
    url: string
}

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>,
    index: number,
    fieldName: Path<T>
}



function UploadFile<T extends FieldValues>({ form, index, fieldName }: Props<T>) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<Images[]>([])
    const sb = supabase()
    console.log("index: ", index);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList

        try {
            setIsLoading(true)
            const uploadImages = await Promise.all(Array.from(files).map(async (file: File) => {
                const filePath = `/products/${file.name}-${Date.now()}`
                const { data, error } = await sb.storage.from("fashion-collection").upload(filePath, file)
                if (error) {
                    console.log(error)
                    toast.error("Error uploading file: " + error.message)
                    return
                }
                const { data: sbUrl, } = sb.storage.from("fashion-collection").getPublicUrl(filePath)
                return { url: sbUrl.publicUrl }
            }))
            // console.log("uploadImages: ", uploadImages)
            const filteredImages = uploadImages.filter((img): img is Images => img !== undefined)
            console.log("filteredImages:", filteredImages);
            // setImageUrl(filteredImages)
            setIsLoading(false)

            const current = form.getValues(fieldName);
            console.log("current: ", current);

            form.setValue(fieldName, [...current, ...filteredImages] as PathValue<T, Path<T>>)


        } catch (err) {
            setIsLoading(false)
            setError(err as string)
            console.log(error)


        } finally {
            setIsLoading(false)
            setError("")

        }
    }

    const images = form.watch(`variants.${index}.images` as Path<T>)
    console.log("images: ", images);

    const id = `image_${index}`


    return (
        <div className='w-full flex flex-col gap-2  '>
            <Label htmlFor={id}
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
            <input type='file' className='hidden'
                accept="image/*"
                id={id}
                multiple={true}
                max={15}
                disabled={isLoading}
                onChange={handleImageUpload}

            />
            <div className="flex flex-wrap gap-3 mt-2  ">
                {images?.map((img: Images, i: number) => (
                    <Image
                        key={i}
                        src={img.url}
                        alt="variant"
                        width={80}
                        height={80}
                        className="rounded border"
                    />
                ))}
            </div>

        </div>
    )
}

export default UploadFile