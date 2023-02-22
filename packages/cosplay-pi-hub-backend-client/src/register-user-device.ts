import { RegisterUserDevice } from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export const registerUserDevice =
  importHubBackendFunc<RegisterUserDevice>(
    `register-user-device`,
  );
