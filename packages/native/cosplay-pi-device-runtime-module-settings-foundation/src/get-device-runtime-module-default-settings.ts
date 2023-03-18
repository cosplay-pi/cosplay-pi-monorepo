import * as fs from 'fs';

import { getDeviceRuntimeModuleDefaultSettingsFilePath } from './get-device-runtime-module-default-settings-file-path';

export const getDeviceRuntimeModuleDefaultSettings = ({
  deviceRuntimeDirPath,
  deviceRuntimeModuleName,
}: {
  deviceRuntimeDirPath: string;
  deviceRuntimeModuleName: string;
}) => {

  const deviceRuntimeModuleDefaultSettingsFilePath =
    getDeviceRuntimeModuleDefaultSettingsFilePath({
      deviceRuntimeDirPath,
      deviceRuntimeModuleName,
    });

  const deviceRuntimeModuleDefaultSettingsAsJson = fs.readFileSync(
    deviceRuntimeModuleDefaultSettingsFilePath,
    `utf-8`,
  );

  return JSON.parse(deviceRuntimeModuleDefaultSettingsAsJson);
};
