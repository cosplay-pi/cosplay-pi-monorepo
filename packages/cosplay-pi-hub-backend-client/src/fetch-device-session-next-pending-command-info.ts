import { FetchDeviceSessionNextPendingCommandInfo } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const fetchDeviceSessionNextPendingCommandInfo =
  importHubBackendFunc<FetchDeviceSessionNextPendingCommandInfo>(
    `fetch-device-session-next-pending-command-info`,
  );
