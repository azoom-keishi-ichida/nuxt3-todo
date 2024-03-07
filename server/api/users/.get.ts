import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const usersData = await prisma.user.findMany()
  return usersData
})
