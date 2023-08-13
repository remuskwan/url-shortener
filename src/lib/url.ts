import { createHash, randomUUID } from 'node:crypto'
import { z } from 'zod'

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const encodeBase62 = (buffer: Buffer): string => {
  let number = BigInt(`0x${buffer.toString('hex')}`)
  let encoded = ''
  while (number) {
    encoded = BASE62[Number(number % BigInt(62))] + encoded
    number /= BigInt(62)
  }
  return encoded
}

export const shortenURL = (originalURL: string): string => {
  const uniqueString = `${originalURL}-${randomUUID()}`
  // Hash the unique string
  const hash = createHash('sha256').update(uniqueString).digest()
  // Encode in base-62
  const encoded = encodeBase62(hash)
  // Optionally, trim to a fixed length
  const shortened = encoded.slice(0, 10)

  return shortened
}

export const formatURL = (input: string): string | null => {
  input = input.trim()

  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    // Assume HTTPS
    input = 'https://' + input
  }

  input = encodeURI(input)

  const result = z.string().url().safeParse(input)

  if (!result.success) {
    console.error('Invalid URL:', input)
    return null
  }

  return input
}
