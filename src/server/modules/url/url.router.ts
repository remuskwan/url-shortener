import { addUrlSchema, byLoggedInUserSchema } from '~/schemas/url'
import { protectedProcedure, publicProcedure, router } from '~/server/trpc'
import { defaultUrlSelect, urlSelectWithUser } from './url.select'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { formatURL, shortenURL } from '~/lib/url'

export const urlRouter = router({
  byLoggedInUser: protectedProcedure
    .input(byLoggedInUserSchema)
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50
      const { cursor } = input

      const items = await ctx.prisma.uRL.findMany({
        select: urlSelectWithUser,
        take: limit + 1,
        cursor: cursor ? { hash: cursor } : undefined,
        orderBy: {
          createdAt: input.order,
        },
        where: {
          user: {
            id: ctx.session.user.id,
          },
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
  byHash: publicProcedure
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
  add: publicProcedure
    .input(addUrlSchema)
    .mutation(async ({ ctx, input: { originalURL } }) => {
      //TODO: replace with KGS
      const formattedURL = formatURL(originalURL)
      if (!formattedURL) {
        throw new TRPCError({
          code: 'PARSE_ERROR',
          message: `Could not parse '${originalURL}'`,
        })
      }

      const hash = shortenURL(formattedURL)
      const isLoggedIn = ctx.session?.user !== undefined
      const url = await ctx.prisma.uRL.create({
        data: {
          hash,
          originalURL: formattedURL,
          ...(isLoggedIn && { userId: ctx.session?.user?.id }),
        },
        select: isLoggedIn ? urlSelectWithUser : defaultUrlSelect,
      })
      return url
    }),
  delete: protectedProcedure
    .input(z.object({ hash: z.string() }))
    .mutation(async ({ ctx, input: { hash } }) => {
      const urlToDelete = await ctx.prisma.uRL.findUnique({
        where: { hash },
        select: urlSelectWithUser,
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
      const url = await ctx.prisma.uRL.delete({
        where: { hash },
      })
      return url
    }),
})
