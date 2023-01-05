import { getDeviceRuntimeModuleSettingsFilePath, writeDeviceRuntimeModuleSettingsFile } from "cosplay-pi-device-runtime-module-settings-foundation";

import { getDeviceHubClientArgs } from "./get-device-hub-client-args";

export const updateDeviceRuntimeModuleSettingsAsync = async ({
  deviceRuntimeModuleName,
  deviceRuntimeModuleSettings,
}: {
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleSettings: unknown;
}) => {
  
  const deviceHubClientArgs = getDeviceHubClientArgs();
  
  writeDeviceRuntimeModuleSettingsFile({
    deviceRuntimeModuleSettingsFilePath: getDeviceRuntimeModuleSettingsFilePath({
      deviceRuntimeModuleName,
      deviceRuntimePackageDirPath: deviceHubClientArgs.deviceRuntimePackageDirPath,
    }),
    deviceRuntimeModuleSettings,
  });
};
