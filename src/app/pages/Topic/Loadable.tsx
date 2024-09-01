/**
 * Asynchronously loads the component for Topic
 */

import { lazyLoad } from 'utils/lazyLoad'

export const Topic = lazyLoad(
  async () => await import('./index'),
  (module) => module.Topic,
)
