import * as path from 'path';

import { deviceRuntimeDirPath } from './env';

export const getDeviceRuntimePackageInfoFilePath = () => {

  return path.resolve(
    deviceRuntimeDirPath,
    `package.json`,
  );
};
