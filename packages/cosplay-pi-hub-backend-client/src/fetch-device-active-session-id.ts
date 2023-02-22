import { FetchDeviceActiveSessionId } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const fetchDeviceActiveSessionId =
  importHubBackendFunc<FetchDeviceActiveSessionId>(
    `fetch-device-active-session-id`,
  );
