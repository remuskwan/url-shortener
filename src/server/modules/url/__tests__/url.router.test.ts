import {
  applySession,
  createMockRequest,
} from 'tests/integration/helpers/iron-session'
import { describe } from 'vitest'
import { appRouter } from '../../_app'
import { type RouterInput } from '~/utils/trpc'

describe('url.byHash', async () => {
  it('should return a url by hash', async () => {
    const ctx = await createMockRequest(applySession())
    const caller = appRouter.createCaller(ctx)

    const input: RouterInput['url']['add'] = {
      originalURL: 'https://example.com',
    }

    const url = await caller.url.add(input)
    const byHash = await caller.url.byHash({ hash: url.hash })

    expect(byHash).toMatchObject(input)
  })
})
