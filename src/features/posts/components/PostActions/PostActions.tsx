import { Box, ButtonGroup } from '@chakra-ui/react'
import { useState, type MouseEventHandler } from 'react'
import { BiHeart } from 'react-icons/bi'
import { useMe } from '~/features/me/api'
import { trpc, type RouterOutput } from '~/utils/trpc'
import { DeletePostAction } from './DeletePostAction'

export interface PostActionsProps {
  url: RouterOutput['url']['byLoggedInUser']['items'][number]
}

export const PostActions = ({
  url: urlProp,
}: PostActionsProps): JSX.Element => {
  const { me } = useMe()

  // Use local state to update the UI immediately on like/unlike
  const [url, setUrl] = useState(urlProp)
  const isOwnPost = me?.username === url.user?.username

  return (
    <ButtonGroup
      variant="clear"
      size="xs"
      colorScheme="neutral"
      justifyContent="space-between"
    >
      {isOwnPost ? (
        <DeletePostAction postId={url.hash} />
      ) : (
        <Box width="2.25rem" />
      )}
    </ButtonGroup>
  )
}
