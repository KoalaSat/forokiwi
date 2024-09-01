/**
 * Asynchronously loads the component for NotFound
 */

import { lazyLoad } from 'utils/lazyLoad'

export const NotFound = lazyLoad(
  async () => await import('./index'),
  (module) => module.NotFound,
)
