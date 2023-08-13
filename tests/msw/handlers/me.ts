import { type User } from '@prisma/client'
import { mockTrpcErrorResponse, trpcMsw } from '../mockTrpc'
import { TRPCError } from '@trpc/server'

export const defaultUser: User = {
  id: 'cljcnahpn0000xlwynuea40lv',
  email: 'test@example.com',
  username: 'testUser',
  name: 'Test User',
  password: 'password',
}

const defaultMeGetQuery = () => {
  return trpcMsw.me.get.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(defaultUser))
  })
}

const unauthorizedMeGetQuery = () => {
  return trpcMsw.me.get.query((_req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json(mockTrpcErrorResponse(new TRPCError({ code: 'UNAUTHORIZED' })))
    )
  })
}

export const meHandlers = {
  me: defaultMeGetQuery,
  unauthorized: unauthorizedMeGetQuery,
}
