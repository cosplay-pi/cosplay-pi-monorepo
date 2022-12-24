import * as path from 'path';

import { getDeviceServiceArgs } from './get-device-service-args';
import { mainScriptFileName } from './main-script-file-name';

export const getRuntimeMainScriptFilePath = () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  return path.resolve(
    deviceServiceArgs.runtimePackageDirPath,
    mainScriptFileName,
  );
};
