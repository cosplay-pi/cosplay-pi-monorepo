import { getDeviceRuntimeModuleSettingsFilePath, writeDeviceRuntimeModuleSettingsFile } from "cosplay-pi-device-runtime-module-settings-foundation";

import { getDeviceServiceArgs } from "./get-device-service-args";

export const updateDeviceRuntimeModuleSettingsAsync = async ({
  deviceRuntimeModuleName,
  deviceRuntimeModuleSettings,
}: {
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleSettings: unknown;
}) => {
  
  const deviceServiceArgs = getDeviceServiceArgs();
  
  writeDeviceRuntimeModuleSettingsFile({
    deviceRuntimeModuleSettingsFilePath: getDeviceRuntimeModuleSettingsFilePath({
      deviceRuntimeModuleName,
      deviceRuntimePackageDirPath: deviceServiceArgs.deviceRuntimePackageDirPath,
    }),
    deviceRuntimeModuleSettings,
  });
};
