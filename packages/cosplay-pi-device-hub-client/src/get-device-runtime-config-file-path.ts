import * as path from 'path';

import { deviceRuntimeDirPath } from './env';

export const getDeviceRuntimeConfigFilePath = () => {

  return path.resolve(
    deviceRuntimeDirPath,
    `config.json`,
  );
};
