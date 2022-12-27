import { $declareGlobal } from './$declare-global';

import { DeviceServiceArgs } from './device-service-args';

export const [
  fetchDeviceServiceCachedArgs,
  setDeviceServiceCachedArgs,
] = $declareGlobal<DeviceServiceArgs | undefined>(
  undefined,
);
