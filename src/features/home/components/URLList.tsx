import { URL } from '~/features/urls/components'
import { trpc } from '~/utils/trpc'
import { EmptyURLList } from './EmptyURLList'
import { Stack, StackDivider } from '@chakra-ui/react'
import { APP_GRID_COLUMN } from '~/constants/layouts'

export const URLList = (): JSX.Element => {
  const [data] = trpc.url.byLoggedInUser.useSuspenseQuery({})

  if (data.items.length === 0) {
    return <EmptyURLList />
  }
  return (
    <Stack
      spacing={0}
      divider={<StackDivider />}
      gridColumn={APP_GRID_COLUMN}
      flexDir="column"
    >
      {data.items.map((url) => (
        <URL key={url.hash} url={url} />
      ))}
    </Stack>
  )
}
