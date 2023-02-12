import * as path from 'path';

import { getDeviceHubClientArgs } from './get-device-hub-client-args';
import { getDeviceRuntimeMainScriptFileName } from './get-device-runtime-main-script-file-name';

export const getDeviceRuntimeMainScriptFilePath = () => {

  const deviceHubClientArgs = getDeviceHubClientArgs();

  return path.resolve(
    deviceHubClientArgs.deviceRuntimePackageDirPath,
    getDeviceRuntimeMainScriptFileName(),
  );
};
