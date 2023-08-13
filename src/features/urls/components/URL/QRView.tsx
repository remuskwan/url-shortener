import { Stack, ButtonGroup } from '@chakra-ui/react'
import QRCode from 'qrcode.react'
import { useRef } from 'react'
import { DownloadQRAction } from '../URLActions/DownloadQRAction'

interface QRViewProps {
  url: string
}

export const QRView: React.FC<QRViewProps> = ({ url }) => {
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) {
      return
    }
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `${url}-qr.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <Stack alignItems="center" direction="column">
      <div ref={qrRef}>
        <QRCode value={url} size={100} />
      </div>
      <ButtonGroup
        variant="clear"
        size="xs"
        colorScheme="neutral"
        justifyContent="space-between"
      >
        <DownloadQRAction handler={handleDownloadQR} />
      </ButtonGroup>
    </Stack>
  )
}
