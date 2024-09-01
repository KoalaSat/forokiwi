/**
 * Asynchronously loads the component for Forums
 */

import { lazyLoad } from 'utils/lazyLoad'

export const ForumList = lazyLoad(
  async () => await import('./index'),
  (module) => module.ForumList,
)
