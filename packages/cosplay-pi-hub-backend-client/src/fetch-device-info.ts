import { FetchDeviceInfo } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const fetchDeviceInfo =
  importHubBackendFunc<FetchDeviceInfo>(
    `fetch-device-info`,
  );
