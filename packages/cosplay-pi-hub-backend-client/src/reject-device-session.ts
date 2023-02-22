import { RejectDeviceSession } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const rejectDeviceSession =
  importHubBackendFunc<RejectDeviceSession>(
    `reject-device-session`,
  );
