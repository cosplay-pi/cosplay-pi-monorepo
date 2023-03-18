import * as fs from 'fs';

import { getDeviceRuntimeModuleDirPath } from './get-device-runtime-module-dir-path';

export const fetchIsDeviceModuleInstalled = ({
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

  return fs.existsSync(deviceRuntimeModuleDirPath);
};
