import { Box, Flex } from '@chakra-ui/react'
import { SkeletonURLList } from '~/components/SkeletonURLList'
import Suspense from '~/components/Suspense'
import { APP_GRID_COLUMN, APP_GRID_TEMPLATE_COLUMN } from '~/constants/layouts'
import { NewURLBanner, URLList } from '~/features/home/components'
import { type NextPageWithLayout } from '~/lib/types'
import { AppGrid } from '~/templates/AppGrid'
import { AdminLayout } from '~/templates/layouts/AdminLayout'

const Home: NextPageWithLayout = () => {
  return (
    <Flex w="100%" flexDir="column">
      <AppGrid
        templateColumns={APP_GRID_TEMPLATE_COLUMN}
        px={{ base: '1rem', lg: 0 }}
        bg="base.canvas.brand-subtle"
        py="1rem"
      >
        <Box gridColumn={APP_GRID_COLUMN}>
          <NewURLBanner />
        </Box>
      </AppGrid>
      <AppGrid
        flex={1}
        bg="white"
        pb="2.5rem"
        templateColumns={APP_GRID_TEMPLATE_COLUMN}
        px={{ base: '1rem', lg: 0 }}
      >
        <Suspense fallback={<SkeletonURLList />}>
          <URLList />
        </Suspense>
      </AppGrid>
    </Flex>
  )
}

Home.getLayout = AdminLayout

export default Home
