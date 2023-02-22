import { OnDeviceSessionStateChanged } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const onDeviceSessionStateChanged =
  importHubBackendFunc<OnDeviceSessionStateChanged>(
    `on-device-session-state-changed`,
  );
