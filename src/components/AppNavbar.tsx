import { Flex, HStack } from '@chakra-ui/react'
import {
  AvatarMenu,
  AvatarMenuDivider,
  Menu,
} from '@opengovsg/design-system-react'
import NextLink from 'next/link'
import { ADMIN_NAVBAR_HEIGHT } from '~/constants/layouts'
import { env } from '~/env.mjs'
import { useMe } from '~/features/me/api'

export const AppNavbar = (): JSX.Element => {
  const { me, logout } = useMe()

  return (
    <Flex flex="0 0 auto" gridColumn="1/-1" height={ADMIN_NAVBAR_HEIGHT}>
      <Flex
        pos="fixed"
        zIndex="docked"
        w="100%"
        justify="space-between"
        align="center"
        px={{ base: '1.5rem', md: '1.8rem', xl: '2rem' }}
        py="0.375rem"
        bg="white"
        borderBottomWidth="1px"
        borderColor="base.divider.medium"
      >
        <NextLink href="/home">{env.NEXT_PUBLIC_APP_NAME}</NextLink>
        <HStack
          textStyle="subhead-1"
          spacing={{ base: '0.75rem', md: '1.5rem' }}
        >
          <AvatarMenu
            name={me?.name ?? undefined}
            variant="subtle"
            bg="base.canvas.brand-subtle"
            menuListProps={{ maxWidth: '19rem' }}
          >
            <AvatarMenuDivider />
            <Menu.Item onClick={() => logout()}>Sign out</Menu.Item>
          </AvatarMenu>
        </HStack>
      </Flex>
    </Flex>
  )
}
