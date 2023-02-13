import * as crypto from 'crypto';

import { declareGlobal } from './declare-global';

export const [
  fetchDeviceCachedPublicKey,
  setDeviceCachedPublicKey,
] = declareGlobal<crypto.KeyObject | undefined>(
  undefined,
);
