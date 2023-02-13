import * as path from 'path';

export const getDeviceRuntimeModuleSettingsFilePath = ({
  deviceRuntimeModuleName,
  deviceRuntimeDirPath,
}: {
  deviceRuntimeModuleName: string;
  deviceRuntimeDirPath: string;
}) => {

  return path.resolve(
    deviceRuntimeDirPath,
    `${deviceRuntimeModuleName}-settings.json`,
  );
};
