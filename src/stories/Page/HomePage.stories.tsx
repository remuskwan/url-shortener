import type { Meta, StoryObj } from '@storybook/react'

import HomePage from '~/pages/home'
import { getMobileViewParameters } from '../utils/viewports'

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home Page',
  component: HomePage,
  parameters: {
    mockdate: new Date('2023-06-28T07:23:18.349Z'),
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const EmptyPostList: Story = {}

export const WithPosts: Story = {
  parameters: {},
}

export const MobileEmptyPostList: Story = {
  parameters: {
    ...EmptyPostList.parameters,
    ...getMobileViewParameters(),
  },
}

export const MobileWithPosts: Story = {
  parameters: {
    ...WithPosts.parameters,
    ...getMobileViewParameters(),
  },
}
