import {
  getDeviceRuntimeModuleSettingsFilePath,
  writeDeviceRuntimeModuleSettingsFile,
} from "cosplay-pi-device-runtime-module-settings-foundation";

import { deviceRuntimeDirPath } from "./env";

export const updateDeviceRuntimeModuleSettingsAsync = async ({
  deviceRuntimeModuleName,
  deviceRuntimeModuleSettings,
}: {
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleSettings: unknown;
}) => {

  writeDeviceRuntimeModuleSettingsFile({
    deviceRuntimeModuleSettingsFilePath: getDeviceRuntimeModuleSettingsFilePath({
      deviceRuntimeModuleName,
      deviceRuntimePackageDirPath: deviceRuntimeDirPath,
    }),
    deviceRuntimeModuleSettings,
  });
};
