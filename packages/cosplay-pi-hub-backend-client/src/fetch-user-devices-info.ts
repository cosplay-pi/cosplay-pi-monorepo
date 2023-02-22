import { FetchUserDevicesInfo } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const fetchUserDevicesInfo =
  importHubBackendFunc<FetchUserDevicesInfo>(
    `fetch-user-devices-info`,
  );
