import * as fs from 'fs';

import { getDeviceRuntimeModuleOverrideSettingsFilePath } from './get-device-runtime-module-override-settings-file-path';

export const fetchDeviceRuntimeModuleOverrideSettings = ({
  deviceRuntimeDirPath,
  deviceRuntimeModuleName,
}: {
  deviceRuntimeDirPath: string;
  deviceRuntimeModuleName: string;
}) => {

  const deviceRuntimeModuleOverrideSettingsFilePath =
    getDeviceRuntimeModuleOverrideSettingsFilePath({
      deviceRuntimeDirPath,
      deviceRuntimeModuleName,
    });

  if (!fs.existsSync(deviceRuntimeModuleOverrideSettingsFilePath)) {

    return {};
  }

  const deviceRuntimeModuleOverrideSettingsAsJson = fs.readFileSync(
    deviceRuntimeModuleOverrideSettingsFilePath,
    `utf-8`,
  );

  return JSON.parse(deviceRuntimeModuleOverrideSettingsAsJson);
};
