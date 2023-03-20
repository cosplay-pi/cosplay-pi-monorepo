import { SetUserDeviceProfile } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const setUserDeviceProfile =
  importHubBackendFunc<SetUserDeviceProfile>(
    `set-user-device-profile`,
  );
