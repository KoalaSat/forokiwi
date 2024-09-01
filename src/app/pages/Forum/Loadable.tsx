/**
 * Asynchronously loads the component for Forums
 */

import { lazyLoad } from 'utils/lazyLoad'

export const Forum = lazyLoad(
  async () => await import('./index'),
  (module) => module.Forum,
)
