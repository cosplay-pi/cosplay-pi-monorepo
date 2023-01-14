import * as fs from 'fs';
import * as path from 'path';

import * as FirebaseAdmin from 'firebase-admin';

import {
  hubBackendPort,
  hubFirebaseServiceAccountCredentialsFilePath,
} from './env';
import { hubBackendExpressApp } from './hub-backend-express-app';

import './confirm-device-session-async';
import './create-device-session-async';
import './fetch-device-active-session-id-async';
import './fetch-device-session-next-pending-command-info-async';
import './fetch-device-session-state-async';
import './fetch-user-devices-info-async';
import './on-device-session-command-finished-async';
import './on-device-session-state-changed-async';
import './push-device-session-command-async';
import './register-user-device-async';
import './reject-device-session-async';

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
  },
);
