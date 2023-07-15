import * as path from 'path';

import * as dotenv from 'dotenv';

dotenv.config();

const hubOverrideBackendUrl =
  process.env[`COSPLAY_PI_HUB_OVERRIDE_BACKEND_URL`] as string | undefined;

const hubOverrideFrontendUrl =
  process.env[`COSPLAY_PI_HUB_OVERRIDE_FRONTEND_URL`] as string | undefined;

const devicePublicKeyOverrideFilePath =
  process.env[`COSPLAY_PI_DEVICE_PUBLIC_KEY_OVERRIDE_FILE_PATH`] as string | undefined;

const deviceRuntimeOverrideDirPath =
  process.env[`COSPLAY_PI_DEVICE_RUNTIME_OVERRIDE_DIR_PATH`] as string | undefined;

export const hubBackendUrl = hubOverrideBackendUrl ?? `https://api.hub.cosplaypi.com`;

export const hubFrontendUrl = hubOverrideFrontendUrl ?? `https://hub.cosplaypi.com`;

export const devicePublicKeyFilePath =
  devicePublicKeyOverrideFilePath ?? path.resolve(
    `./device-public-key.pem`,
  );

export const deviceRuntimeDirPath =
  deviceRuntimeOverrideDirPath ?? path.resolve(
    `./device-runtime`,
  );
