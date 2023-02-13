import * as crypto from 'crypto';

import { declareGlobal } from 'cosplay-pi-ts-core';

export const [
  fetchDeviceCachedPublicKey,
  setDeviceCachedPublicKey,
] = declareGlobal<crypto.KeyObject | undefined>(
  undefined,
);
