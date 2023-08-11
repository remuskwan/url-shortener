import { addUrlSchema, byUserSchema } from '~/schemas/url'
import { protectedProcedure, publicProcedure, router } from '~/server/trpc'
import { defaultUrlSelect } from './url.select'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const urlRouter = router({
  byUser: publicProcedure.input(byUserSchema).query(async ({ ctx, input }) => {
    const limit = input.limit ?? 50
    const { cursor } = input

    const items = await ctx.prisma.uRL.findMany({
      select: defaultUrlSelect,
      take: limit + 1,
      cursor: cursor ? { hash: cursor } : undefined,
      orderBy: {
        createdAt: input.order,
      },
      where: {
        user: { username: input.username },
      },
    })
    let nextCursor: typeof cursor | undefined = undefined
    if (items.length > limit) {
      // Remove the last item and use it as next cursor

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const nextItem = items.pop()!
      nextCursor = nextItem.hash
    }

    return { items, nextCursor }
  }),
  //TODO: change to protected
  byHash: protectedProcedure
    .input(z.object({ hash: z.string() }))
    .query(async ({ ctx, input: { hash } }) => {
      const url = await ctx.prisma.uRL.findUnique({
        where: { hash },
        select: defaultUrlSelect,
      })
      if (!url) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No url with hash '${hash}'`,
        })
      }

      return url
    }),
  add: publicProcedure.input(addUrlSchema).mutation(async ({ ctx, input }) => {
    //TODO: replace with KGS
  }),
  //TODO: change to protected
  delete: protectedProcedure
    .input(z.object({ hash: z.string() }))
    .mutation(async ({ ctx, input: { hash } }) => {
      const urlToDelete = await ctx.prisma.uRL.findUnique({
        where: { hash },
        select: defaultUrlSelect,
      })
      if (!urlToDelete) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No url with hash '${hash}'`,
        })
      }
      if (urlToDelete.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `You are not authorized to delete this url`,
        })
      }
      const url = await ctx.prisma.uRL.update({
        where: { hash },
        data: { deletedAt: new Date() },
      })

      return url
    }),
})
