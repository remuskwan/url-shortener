import { Stack, type StackProps, Text } from '@chakra-ui/react'
import { Link } from '@opengovsg/design-system-react'
import NextLink from 'next/link'
import { useMemo } from 'react'
import { formatRelativeTime } from '~/lib/dates'
import { type RouterOutput } from '~/utils/trpc'
import { URLActions } from '../URLActions'
import { formatNewURL } from '../../utils/formatNewURL'
import { QRView } from './QRView'

export interface URLViewProps {
  url: RouterOutput['url']['byLoggedInUser']['items'][number]
  hideActions?: boolean
  containerProps?: StackProps
}

export const URLView = ({
  url,
  hideActions,
  containerProps,
}: URLViewProps): JSX.Element => {
  const relativeDate = useMemo(() => formatRelativeTime(url.createdAt), [url])

  const newURL = formatNewURL(url.hash)

  return (
    <Stack
      flexDir="column"
      spacing={0}
      px={{ base: '1rem', lg: '1.5rem' }}
      mx={{ base: '-1rem', lg: '-1.5rem' }}
      {...containerProps}
    >
      <Stack justifyContent="space-between" spacing="1rem" direction="row">
        <Stack spacing="1rem">
          <Text textStyle="subhead-2" color="base.content.strong">
            {newURL}
          </Text>
          <Link
            data-value="url-action"
            variant="standalone"
            p={0}
            as={NextLink}
            href={url.originalURL}
            textStyle="body-2"
            color="base.content.medium"
          >
            {url.originalURL}
          </Link>
          <Text
            title={url.createdAt.toLocaleString()}
            textStyle="body-2"
            color="base.content.medium"
          >
            {relativeDate}
          </Text>
        </Stack>
        <QRView url={newURL} />
      </Stack>
      <Stack>{!hideActions && <URLActions url={url} />}</Stack>
    </Stack>
  )
}
