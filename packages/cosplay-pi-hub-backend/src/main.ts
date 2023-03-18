import * as fs from 'fs';
import * as path from 'path';

import * as FirebaseAdmin from 'firebase-admin';

import {
  hubBackendPort,
  hubFirebaseServiceAccountCredentialsFilePath,
} from './env';
import { hubBackendExpressApp } from './hub-backend-express-app';
import { validateDeviceActiveSessions } from './validate-device-active-sessions';

import './confirm-device-session';
import './create-device-session';
import './fetch-device-active-session-id';
import './fetch-device-info';
import './fetch-device-session-next-pending-command-info';
import './fetch-device-runtime-last-state';
import './fetch-user-devices-info';
import './on-device-session-command-finished';
import './on-device-runtime-state-changed';
import './push-device-session-command';
import './register-user-device';
import './reject-device-session';

const hubFirebaseServiceAccountCredentials = JSON.parse(
  fs.readFileSync(
    path.resolve(
      hubFirebaseServiceAccountCredentialsFilePath,
    ),
    `utf8`,
  ),
);

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(
    hubFirebaseServiceAccountCredentials,
  ),
});

hubBackendExpressApp.listen(
  hubBackendPort,
  async () => {

    console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`);
    console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`);
    console.log(`✔✔✔✔✔✔✔ cosplay-pi-hub-backend working at port ${hubBackendPort} ✔✔✔✔✔✔✔`);
    console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`);
    console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`);

    setInterval(
      async () => {

        try {

          console.log(`Validating device active sessions...`);
          await validateDeviceActiveSessions();
          console.log(`Finished validating device active sessions.`);

        } catch (e) {

          console.error(e);
        }
      },
      15 * 1000,
    );
  },
);
