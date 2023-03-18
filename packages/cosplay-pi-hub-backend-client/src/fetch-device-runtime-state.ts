import { FetchDeviceRuntimeLastState } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const fetchDeviceRuntimeLastState =
  importHubBackendFunc<FetchDeviceRuntimeLastState>(
    `fetch-device-runtime-last-state`,
  );
