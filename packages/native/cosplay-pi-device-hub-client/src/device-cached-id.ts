import { declareGlobal } from 'cosplay-pi-ts-core';

export const [
  fetchDeviceCachedId,
  setDeviceCachedId,
] = declareGlobal<string | undefined>(
  undefined,
);
