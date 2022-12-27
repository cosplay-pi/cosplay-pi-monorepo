import * as path from 'path';

import { getDeviceServiceArgs } from './get-device-service-args';

export const getDeviceRuntimePackageInfoFilePath = () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  return path.resolve(
    deviceServiceArgs.deviceRuntimePackageDirPath,
    `package.json`,
  );
};
