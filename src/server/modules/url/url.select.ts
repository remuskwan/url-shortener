import { Prisma } from '@prisma/client'

export const defaultUrlSelect = Prisma.validator<Prisma.URLSelect>()({
  hash: true,
  originalURL: true,
  createdAt: true,
  deletedAt: true,
})

export const urlSelectWithUser = Prisma.validator<Prisma.URLSelect>()({
  hash: true,
  originalURL: true,
  createdAt: true,
  deletedAt: true,
  userId: true,
  user: {
    select: {
      name: true,
      username: true,
    },
  },
})
