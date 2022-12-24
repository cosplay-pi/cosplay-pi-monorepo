import { getModuleSettingsFilePath, writeModuleSettingsFile } from "costume-chip-module-settings-foundation";

import { getDeviceServiceArgs } from "./get-device-service-args";

export const updateModuleSettingsAsync = async ({
  moduleName,
  moduleSettings,
}: {
  moduleName: string;
  moduleSettings: unknown;
}) => {
  
  const deviceServiceArgs = getDeviceServiceArgs();
  
  writeModuleSettingsFile({
    moduleSettingsFilePath: getModuleSettingsFilePath({
      moduleName: moduleName,
      runtimePackageDirPath: deviceServiceArgs.runtimePackageDirPath,
    }),
    moduleSettings,
  });
};
