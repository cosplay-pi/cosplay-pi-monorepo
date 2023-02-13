import { declareGlobal } from './declare-global';

export const [
  fetchDeviceCachedId,
  setDeviceCachedId,
] = declareGlobal<string | undefined>(
  undefined,
);
