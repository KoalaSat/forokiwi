/**
 * Asynchronously loads the component for NewTopic
 */

import { lazyLoad } from 'utils/lazyLoad'

export const NewTopic = lazyLoad(
  async () => await import('./index'),
  (module) => module.NewTopic,
)
