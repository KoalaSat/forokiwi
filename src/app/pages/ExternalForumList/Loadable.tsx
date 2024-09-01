/**
 * Asynchronously loads the component for Forums
 */

import { lazyLoad } from 'utils/lazyLoad'

export const ExternalForumList = lazyLoad(
  async () => await import('./index'),
  (module) => module.ExternalForumList,
)
