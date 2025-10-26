import { getProduct, getRelatedProducts } from '@/lib/supabase/query'
import { ProductType } from '@/lib/types'
import Image from 'next/image'
import React from 'react'
import ImageCard from './image-card'
import Currency from '@/components/ui/currency'
import DetailCard from './details-card'
import RelateProducts from '@/components/custom/relate-products'
import { Description } from '@radix-ui/react-dialog'
import { PlusCircle } from 'lucide-react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const page = async ({ params }: any) => {
    const { id } = await params
    const product: any = await getProduct(id)
    const relatedProduct: any = await getRelatedProducts(product.categoryId.name)
    // console.log(relatedProduct)
    return (
        <div className='w-full mt-10 block min-h-screen mb-20'>
            <div className='flex flex-col gap-8 max-w-7xl mx-auto '>
                <div className='flex gap-8 w-full mx-auto flex-wrap items-start justify-start '>
                    <ImageCard images={product?.images} />
                    <DetailCard product={product} />

                </div>

                <RelateProducts relatedProduct={relatedProduct} />

                <DescriptionCard description={product} />

                {/* Recent View */}

            </div>


        </div>
    )
}

export default page



const DescriptionCard = ({ description }: { description: ProductType }) => {
    return (
        <div className='w-full max-w-5xl px-5 md:px-10 mt-10 '>
            {/* <div className="flex w-full max-w-sm flex-col gap-6"> */}
            <Tabs defaultValue="description">
                <TabsList>
                    <TabsTrigger value="description">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    {/* <TabsTrigger value="password">Password</TabsTrigger> */}
                </TabsList>
                <TabsContent value="description">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            {description.description}

                        </CardContent>

                    </Card>
                </TabsContent>
                <TabsContent value="reviews">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you&apos;ll be logged
                                out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <article>{description.name}</article>
                        </CardContent>

                    </Card>
                </TabsContent>
            </Tabs>
            <div></div>
        </div>
    )

}

