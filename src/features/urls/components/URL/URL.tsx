import { type RouterOutput } from '~/utils/trpc'
import { URLView } from './URLView'

export interface URLProps {
  url: RouterOutput['url']['byLoggedInUser']['items'][number]
  hideActions?: boolean
}

export const URL = ({ url, hideActions }: URLProps): JSX.Element => {
  return (
    <URLView
      containerProps={{
        py: '1.5rem',
        layerStyle: 'url',
        tabIndex: 0,
        cursor: 'pointer',
        role: 'button',
      }}
      url={url}
      hideActions={hideActions}
    />
  )
}
