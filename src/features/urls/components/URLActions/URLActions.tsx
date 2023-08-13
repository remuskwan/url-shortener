import { Box, ButtonGroup } from '@chakra-ui/react'
import { useMe } from '~/features/me/api'
import { type RouterOutput } from '~/utils/trpc'
import { DeleteURLAction } from './DeleteURLAction'

export interface URLActionsProps {
  url: RouterOutput['url']['byLoggedInUser']['items'][number]
}

export const URLActions = ({ url }: URLActionsProps): JSX.Element => {
  const { me } = useMe()

  const isOwnPost = me?.username === url.user?.username

  return (
    <ButtonGroup
      variant="clear"
      size="xs"
      colorScheme="neutral"
      justifyContent="space-between"
    >
      {isOwnPost ? (
        <DeleteURLAction postId={url.hash} />
      ) : (
        <Box width="2.25rem" />
      )}
    </ButtonGroup>
  )
}
