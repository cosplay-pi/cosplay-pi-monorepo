import { $declareGlobal } from './$declare-global';

import { DeviceHubClientArgs } from './device-hub-client-args';

export const [
  fetchDeviceHubClientCachedArgs,
  setDeviceHubClientCachedArgs,
] = $declareGlobal<DeviceHubClientArgs | undefined>(
  undefined,
);
