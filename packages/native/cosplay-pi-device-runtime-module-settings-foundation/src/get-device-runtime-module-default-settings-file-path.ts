import * as path from 'path';

import { getDeviceRuntimeModuleDirPath } from './get-device-runtime-module-dir-path';

export const getDeviceRuntimeModuleDefaultSettingsFilePath = ({
  deviceRuntimeDirPath,
  deviceRuntimeModuleName,
}: {
  deviceRuntimeDirPath: string;
  deviceRuntimeModuleName: string;
}) => {

  const deviceRuntimeModuleDirPath = getDeviceRuntimeModuleDirPath({
    deviceRuntimeDirPath,
    deviceRuntimeModuleName,
  });

  return path.resolve(
    deviceRuntimeModuleDirPath,
    `default-settings.json`,
  );
};
