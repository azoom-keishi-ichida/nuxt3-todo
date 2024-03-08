import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const params = event.context.params
  const body = await readBody(event)

  if (!params) {
    return
  }

  interface dataType {
    title: string
  }

  const postData: dataType = {
    title: body.title,
  }

  console.log(postData)

  const result = await prisma.post.create({
    data: {
      ...postData,
      author: {
        connect: {
          id: Number(params.id),
        },
      },
    },
  })
  return result
})
