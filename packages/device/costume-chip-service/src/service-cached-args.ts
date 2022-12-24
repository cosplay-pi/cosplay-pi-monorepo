import { $declareGlobal } from './$declare-global';

import { ServiceArgs } from './service-args';

export const [
  fetchServiceCachedArgs,
  setServiceCachedArgs,
] = $declareGlobal<ServiceArgs | undefined>(
  undefined,
);
