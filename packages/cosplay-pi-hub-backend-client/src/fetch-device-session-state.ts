import { FetchDeviceSessionState } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const fetchDeviceSessionState =
  importHubBackendFunc<FetchDeviceSessionState>(
    `fetch-device-session-state`,
  );
