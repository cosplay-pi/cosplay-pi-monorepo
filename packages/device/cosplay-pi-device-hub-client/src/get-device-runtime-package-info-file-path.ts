import * as path from 'path';

import { getDeviceHubClientArgs } from './get-device-hub-client-args';

export const getDeviceRuntimePackageInfoFilePath = () => {

  const deviceHubClientArgs = getDeviceHubClientArgs();

  return path.resolve(
    deviceHubClientArgs.deviceRuntimePackageDirPath,
    `package.json`,
  );
};
