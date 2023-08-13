import { Tooltip } from '@chakra-ui/react'
import { IconButton } from '@opengovsg/design-system-react'
import { useState, type MouseEventHandler, useEffect } from 'react'
import { BiDownload } from 'react-icons/bi'

interface DownloadActionProps {
  handler: () => void
}

export const DownloadQRAction = ({
  handler,
}: DownloadActionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Close tooltip after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const handleDownloadAction: MouseEventHandler = async (e) => {
    setIsOpen(true)
    e.stopPropagation()
    handler()
  }

  return (
    <Tooltip label="QR code downloaded!" hasArrow isOpen={isOpen}>
      <IconButton
        onMouseLeave={() => setIsOpen(false)}
        data-value="url-action"
        aria-label="Link to original URL"
        icon={<BiDownload fontSize="1.25rem" />}
        onClick={handleDownloadAction}
      />
    </Tooltip>
  )
}
