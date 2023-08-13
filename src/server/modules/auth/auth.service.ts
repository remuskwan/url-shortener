import { type Prisma, type PrismaClient } from '@prisma/client'
import { VerificationError } from './auth.error'
import { compareHashes } from './auth.util'
import bcrypt from 'bcrypt'
import { defaultMeSelect } from '../me/me.select'
import { generateUsername } from '../me/me.service'
import { set } from 'lodash'
import { type Context } from '~/server/context'

export const verifyToken = async (
  prisma: PrismaClient,
  { token, email }: { token: string; email: string }
) => {
  try {
    const verificationToken = await prisma.verificationToken.update({
      where: {
        identifier: email,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    })

    if (verificationToken.attempts > 5) {
      throw new VerificationError('Too many attempts')
    }

    if (
      verificationToken.expires.valueOf() < Date.now() ||
      !compareHashes(token, email, verificationToken.token)
    ) {
      throw new VerificationError('Token is invalid or has expired')
    }

    if (verificationToken.attempts > 5) {
      throw new VerificationError('Too many attempts')
    }

    await prisma.verificationToken.delete({
      where: {
        identifier: email,
      },
    })

    return
  } catch (error) {
    // see error code here: https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
    if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw new VerificationError('Invalid login email')
    }
    throw error
  }
}
export const signUpUser = (
  ctx: Context,
  { email, password }: { email: string; password: string }
) => {
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, function (err, salt) {
    //TODO: replace with logging
    if (err) {
      throw new Error('Error generating salt')
    }
    //Hash the password using the salt
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
        throw new Error('Error hashing password')
      }
      const emailName = email.split('@')[0] ?? 'unknown'
      const user = await ctx.prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          password: hash,
          emailVerified: new Date(),
          name: emailName,
          username: generateUsername(emailName),
        },
        select: defaultMeSelect,
      })
      //Login user. Only set useId in session
      set(ctx, 'session.userId', user.id)
      await ctx.session?.save()
    })
  })
}
