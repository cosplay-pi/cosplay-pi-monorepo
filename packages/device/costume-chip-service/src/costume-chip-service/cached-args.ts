import * as __ from './__';

import { Args } from './args';

export const [
  fetchCachedArgs,
  setCachedArgs,
] = __.$declareGlobal<Args | undefined>(
  undefined,
);
