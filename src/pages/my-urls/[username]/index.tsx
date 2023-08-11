import { Stack, StackDivider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Post } from '~/features/posts/components'
import { trpc } from '~/utils/trpc'

export const MyURLsList = (): JSX.Element => {
  const { query } = useRouter()

  const [data] = trpc.post.byUser.useSuspenseQuery({
    username: String(query.username),
  })

  return (
    <Stack spacing={0} divider={<StackDivider />} py="1rem">
      {data.posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </Stack>
  )
}

const MyURLs = () => {
  return <div>URLs</div>
}

export default MyURLs
