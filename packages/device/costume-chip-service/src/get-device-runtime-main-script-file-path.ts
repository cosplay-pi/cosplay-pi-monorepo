import * as path from 'path';

import { getDeviceServiceArgs } from './get-device-service-args';
import { getDeviceRuntimeMainScriptFileName } from './get-device-runtime-main-script-file-name';

export const getDeviceRuntimeMainScriptFilePath = () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  return path.resolve(
    deviceServiceArgs.deviceRuntimePackageDirPath,
    getDeviceRuntimeMainScriptFileName(),
  );
};
