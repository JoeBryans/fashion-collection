import React from 'react'

interface Props {
  params: {
    slug: string
  }
}
const page = async ({ params }: Props) => {
    const slug = params.slug
    console.log(slug)

  return (
    <div>page</div>
  )
}

export default page