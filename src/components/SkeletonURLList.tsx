import { Stack, StackDivider } from '@chakra-ui/react'
import { useMemo } from 'react'
import { APP_GRID_COLUMN } from '~/constants/layouts'
import { SkeletonURL } from '~/features/urls/components'

interface SkeletonPostListProps {
  /**
   * Number of skeleton posts to render
   * @default 10
   */
  count?: number
}

export const SkeletonURLList = ({
  count = 10,
}: SkeletonPostListProps): JSX.Element => {
  const skeletonPosts = useMemo(() => {
    return Array.from({ length: count }, (_, index) => (
      <SkeletonURL key={index} />
    ))
  }, [count])

  return (
    <Stack
      spacing={0}
      divider={<StackDivider />}
      gridColumn={APP_GRID_COLUMN}
      flexDir="column"
    >
      {skeletonPosts}
    </Stack>
  )
}
