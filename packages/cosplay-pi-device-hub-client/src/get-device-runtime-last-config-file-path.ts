import * as path from 'path';

import { deviceRuntimeDirPath } from './env';

export const getDeviceRuntimeLastConfigFilePath = () => {

  return path.resolve(
    deviceRuntimeDirPath,
    `last-config.json`,
  );
};
