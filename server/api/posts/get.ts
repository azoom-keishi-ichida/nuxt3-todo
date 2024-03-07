import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const postsData = await prisma.post.findMany()
  return postsData
})
