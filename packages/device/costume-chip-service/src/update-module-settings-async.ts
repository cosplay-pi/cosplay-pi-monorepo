import { getModuleSettingsFilePath, writeModuleSettingsFile } from "costume-chip-module-settings-foundation";

import { getServiceArgs } from "./get-service-args";

export const updateModuleSettingsAsync = async ({
  moduleName,
  moduleSettings,
}: {
  moduleName: string;
  moduleSettings: unknown;
}) => {
  
  const serviceArgs = getServiceArgs();
  
  writeModuleSettingsFile({
    moduleSettingsFilePath: getModuleSettingsFilePath({
      moduleName: moduleName,
      runtimePackageDirPath: serviceArgs.runtimePackageDirPath,
    }),
    moduleSettings,
  });
};
