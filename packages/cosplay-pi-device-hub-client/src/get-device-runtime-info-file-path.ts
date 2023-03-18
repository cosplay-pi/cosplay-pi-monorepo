import * as path from 'path';

import { deviceRuntimeDirPath } from './env';

export const getDeviceRuntimeInfoFilePath = () => {

  return path.resolve(
    deviceRuntimeDirPath,
    `package.json`,
  );
};
