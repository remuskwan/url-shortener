import { protectedProcedure, router } from '~/server/trpc'
import { defaultMeSelect } from './me.select'

export const meRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      select: defaultMeSelect,
    })
  }),
})
