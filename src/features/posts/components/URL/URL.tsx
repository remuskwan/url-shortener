import { type RouterOutput } from '~/utils/trpc'
import { URLView } from './URLView'

export interface URLProps {
  post: RouterOutput['url']['byLoggedInUser']['items'][number]
  hideActions?: boolean
}

export const URL = ({ post, hideActions }: URLProps): JSX.Element => {
  return (
    <URLView
      containerProps={{
        py: '1.5rem',
        layerStyle: 'post',
        tabIndex: 0,
        cursor: 'pointer',
        role: 'button',
      }}
      url={post}
      hideActions={hideActions}
    />
  )
}
