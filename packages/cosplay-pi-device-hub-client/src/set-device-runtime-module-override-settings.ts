import * as fs from 'fs';

import { getDeviceRuntimeModuleOverrideSettingsFilePath } from 'cosplay-pi-device-runtime-client';

import { createDeviceRuntimeDir } from './create-device-runtime-dir';
import { fetchDeviceRuntimeProcess } from './device-runtime-process';
import { deviceRuntimeDirPath } from './env';

export const setDeviceRuntimeModuleOverrideSettings = async ({
  deviceRuntimeModuleName,
  deviceRuntimeModuleOverrideSettings,
}: {
  deviceRuntimeModuleName: string,
  deviceRuntimeModuleOverrideSettings: unknown,
}) => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  createDeviceRuntimeDir();

  const deviceRuntimeModuleOverrideSettingsFilePath =
    getDeviceRuntimeModuleOverrideSettingsFilePath({
      deviceRuntimeDirPath,
      deviceRuntimeModuleName,
    });

  const deviceRuntimeModuleOverrideSettingsAsJson = JSON.stringify(
    deviceRuntimeModuleOverrideSettings,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceRuntimeModuleOverrideSettingsFilePath,
    deviceRuntimeModuleOverrideSettingsAsJson,
    `utf8`,
  );
};
