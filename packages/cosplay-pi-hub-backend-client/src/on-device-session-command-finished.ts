import { OnDeviceSessionCommandFinished } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const onDeviceSessionCommandFinished =
  importHubBackendFunc<OnDeviceSessionCommandFinished>(
    `on-device-session-command-finished`,
  );
