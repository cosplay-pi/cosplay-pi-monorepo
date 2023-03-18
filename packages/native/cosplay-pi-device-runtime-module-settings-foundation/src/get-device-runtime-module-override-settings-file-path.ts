import * as path from 'path';

export const getDeviceRuntimeModuleOverrideSettingsFilePath = ({
  deviceRuntimeDirPath,
  deviceRuntimeModuleName,
}: {
  deviceRuntimeDirPath: string;
  deviceRuntimeModuleName: string;
}) => {

  return path.resolve(
    deviceRuntimeDirPath,
    `${deviceRuntimeModuleName}-override-settings.json`,
  );
};
