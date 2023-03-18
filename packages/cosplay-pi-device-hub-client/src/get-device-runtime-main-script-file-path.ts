import * as path from 'path';

import { deviceRuntimeDirPath } from './env';
import { getDeviceRuntimeMainScriptFileName } from './get-device-runtime-main-script-file-name';

export const getDeviceRuntimeMainScriptFilePath = () => {

  return path.resolve(
    deviceRuntimeDirPath,
    getDeviceRuntimeMainScriptFileName(),
  );
};
