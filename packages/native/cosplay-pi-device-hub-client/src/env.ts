import * as dotenv from 'dotenv';

dotenv.config();

export const deviceConfigFilePath =
  process.env[`COSPLAY_PI_DEVICE_CONFIG_FILE_PATH`] as string;

export const devicePublicKeyFilePath =
  process.env[`COSPLAY_PI_DEVICE_PUBLIC_KEY_FILE_PATH`] as string;

export const deviceRuntimeDirPath =
  process.env[`COSPLAY_PI_DEVICE_RUNTIME_DIR_PATH`] as string;
