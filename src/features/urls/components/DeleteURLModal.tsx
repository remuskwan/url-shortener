import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react'
import { Button, ModalCloseButton } from '@opengovsg/design-system-react'
import { ResponsiveButton } from '~/components/ResponsiveButton'
import { ResponsiveModal } from '~/components/ResponsiveModal'
import { ResponsiveModalButtonGroup } from '~/components/ResponsiveModalButtonGroup'
import { trpc, type RouterOutput } from '~/utils/trpc'

interface DeleteURLModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  urlHash: RouterOutput['url']['byLoggedInUser']['items'][number]['hash']
}

export const DeleteURLModal = ({
  isOpen,
  onClose,
  urlHash,
}: DeleteURLModalProps) => {
  const utils = trpc.useContext()
  const deletePostMutation = trpc.url.delete.useMutation({
    onSuccess: async () => {
      await utils.url.invalidate()
      onClose()
    },
  })

  const handleDelete = () => {
    return deletePostMutation.mutate({ hash: urlHash })
  }

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Delete short URL</ModalHeader>
        <ModalBody>This action cannot be undone.</ModalBody>
        <ModalFooter>
          <ResponsiveModalButtonGroup>
            <Button
              display={{
                base: 'none',
                md: 'flex',
              }}
              colorScheme="neutral"
              variant="clear"
              size={{ base: 'lg', md: 'xs' }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <ResponsiveButton
              colorScheme="critical"
              variant="solid"
              size={{ base: 'lg', md: 'xs' }}
              onClick={handleDelete}
              isLoading={deletePostMutation.isLoading}
            >
              Delete
            </ResponsiveButton>
          </ResponsiveModalButtonGroup>
        </ModalFooter>
      </ModalContent>
    </ResponsiveModal>
  )
}
