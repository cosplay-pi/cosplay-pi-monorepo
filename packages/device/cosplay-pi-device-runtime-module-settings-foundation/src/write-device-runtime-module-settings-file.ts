import * as fs from 'fs';

export const writeDeviceRuntimeModuleSettingsFile = <TDeviceRuntimeModuleSettings>({
  deviceRuntimeModuleSettingsFilePath,
  deviceRuntimeModuleSettings,
}: {
  deviceRuntimeModuleSettingsFilePath: string,
  deviceRuntimeModuleSettings: TDeviceRuntimeModuleSettings,
}) => {

  const deviceRuntimeModuleSettingsAsJson = JSON.stringify(
    deviceRuntimeModuleSettings,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceRuntimeModuleSettingsFilePath,
    deviceRuntimeModuleSettingsAsJson,
    `utf8`,
  );
};
