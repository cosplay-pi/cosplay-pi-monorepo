import { PushDeviceSessionCommand } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const pushDeviceSessionCommand =
  importHubBackendFunc<PushDeviceSessionCommand>(
    `push-device-session-command`,
  );
