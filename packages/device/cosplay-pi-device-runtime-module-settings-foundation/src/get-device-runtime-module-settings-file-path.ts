import * as path from 'path';

export const getDeviceRuntimeModuleSettingsFilePath = ({
  deviceRuntimeModuleName,
  deviceRuntimePackageDirPath,
}: {
  deviceRuntimeModuleName: string;
  deviceRuntimePackageDirPath: string;
}) => {

  return path.resolve(
    deviceRuntimePackageDirPath,
    `${deviceRuntimeModuleName}-settings.json`,
  );
};
