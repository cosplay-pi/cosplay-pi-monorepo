import * as path from 'path';

import { getDeviceServiceArgs } from './get-device-service-args';

export const getRuntimePackageInfoFilePath = () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  return path.resolve(
    deviceServiceArgs.runtimePackageDirPath,
    `package.json`,
  );
};
