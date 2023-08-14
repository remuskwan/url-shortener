import { publicProcedure, router } from '~/server/trpc'
import { z } from 'zod'
import { defaultMeSelect, meSelectWithPassword } from '../me/me.select'
import { set } from 'lodash'
import { TRPCError } from '@trpc/server'
import { generateUsername } from '../me/me.service'
import { compareHash, hashPassword } from './auth.util'

export const authRouter = router({
  signUp: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input: { email, password } }) => {
      try {
        return await ctx.prisma.$transaction(async (tx) => {
          //first check if the user already exists
          const user = await tx.user.findUnique({
            where: { email },
            select: defaultMeSelect,
          })
          //if the user exists, throw an error
          if (user) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Email address already exists. Log in instead.',
            })
          }
          const hashedPassword = await hashPassword(password)
          const emailName = email.split('@')[0] ?? 'unknown'
          //create new user with credentials
          const newUser = await tx.user.create({
            data: {
              email,
              password: hashedPassword,
              name: emailName,
              username: generateUsername(emailName),
            },
            select: defaultMeSelect,
          })
          set(ctx, 'session.user', user)
          await ctx.session?.save()
          return newUser
        })
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: e.message,
            cause: e,
          })
        }
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { email, password } }) => {
      //Compare hashes
      const user = await ctx.prisma.user.findUnique({
        where: { email },
        select: meSelectWithPassword,
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Email address does not exist. Sign up instead.',
        })
      }
      try {
        const isValid = await compareHash(password, user.password)
        if (!isValid) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid login email or password',
          })
        }
        set(ctx, 'session.user', user)
        await ctx.session?.save()
        const { password: _, ...augmentedUser } = user
        return augmentedUser
      } catch (e) {
        if (e instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: e.message,
            cause: e,
          })
        }
      }
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.session?.destroy()
    return { isLoggedIn: false }
  }),
})
