import { OnDeviceRuntimeStateChanged } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const onDeviceRuntimeStateChanged =
  importHubBackendFunc<OnDeviceRuntimeStateChanged>(
    `on-device-runtime-state-changed`,
  );
