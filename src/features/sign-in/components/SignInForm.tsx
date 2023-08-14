import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { EmailInput } from './Emailnput'
import { SignUpInput } from './SignUpInput'

export const SignInForm = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Log in</Tab>
        <Tab>Sign up</Tab>
      </TabList>
      <TabPanels mt="1rem">
        <TabPanel>
          <EmailInput />
        </TabPanel>
        <TabPanel>
          <SignUpInput />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
