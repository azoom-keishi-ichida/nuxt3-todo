import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const params = event.context.params

  if (!params) {
    return
  }

  const groupData = await prisma.post.deleteMany({
    where: {
      id: Number(params.id),
    },
  })
  return groupData
})
