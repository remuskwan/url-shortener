import { useDisclosure } from '@chakra-ui/react'
import { IconButton } from '@opengovsg/design-system-react'
import { type MouseEventHandler } from 'react'
import { BiTrash } from 'react-icons/bi'
import { type RouterOutput } from '~/utils/trpc'
import { DeleteURLModal } from '../DeleteURLModal'

interface DeleteURLActionProps {
  postId: RouterOutput['url']['byLoggedInUser']['items'][number]['hash']
}
export const DeleteURLAction = ({
  postId,
}: DeleteURLActionProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenModal: MouseEventHandler = (e) => {
    e.stopPropagation()
    onOpen()
  }

  return (
    <>
      <IconButton
        data-value="post-action"
        colorScheme="critical"
        onClick={handleOpenModal}
        aria-label="Delete post"
        icon={<BiTrash fontSize="1.25rem" />}
      />
      <DeleteURLModal urlHash={postId} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
