import { Tooltip } from '@chakra-ui/react'
import { IconButton } from '@opengovsg/design-system-react'
import { useState, type MouseEventHandler, useEffect } from 'react'
import { BiLink } from 'react-icons/bi'

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
      <IconButton
        onMouseLeave={() => setIsOpen(false)}
        data-value="url-action"
        aria-label="Link to original URL"
        icon={<BiLink fontSize="1.25rem" />}
        onClick={handleCopyLink}
      />
    </Tooltip>
  )
}
