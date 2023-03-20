import * as dotenv from 'dotenv';

dotenv.config();

export const hubBackendUrl =
  process.env[`COSPLAY_PI_HUB_BACKEND_URL`] as string;

export const hubFrontendUrl =
  process.env[`COSPLAY_PI_HUB_FRONTEND_URL`] as string;

export const devicePublicKeyFilePath =
  process.env[`COSPLAY_PI_DEVICE_PUBLIC_KEY_FILE_PATH`] as string;

export const deviceRuntimeDirPath =
  process.env[`COSPLAY_PI_DEVICE_RUNTIME_DIR_PATH`] as string;
