import { Button, Tooltip } from '@chakra-ui/react'
import { useState, type MouseEventHandler, useEffect } from 'react'

interface CopyActionProps {
  url: string
}

export const CopyAction = ({ url }: CopyActionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Close tooltip after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const handleCopyLink: MouseEventHandler = async (e) => {
    setIsOpen(true)
    e.stopPropagation()
    await navigator.clipboard.writeText(url)
  }

  return (
    <Tooltip label="Link copied!" hasArrow isOpen={isOpen}>
      <Button
        variant="clear"
        size="xs"
        colorScheme="blue"
        onMouseLeave={() => setIsOpen(false)}
        data-value="url-action"
        aria-label="Link to original URL"
        onClick={handleCopyLink}
      >
        Copy
      </Button>
    </Tooltip>
  )
}
