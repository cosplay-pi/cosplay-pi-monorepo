import * as path from 'path';

import { getServiceArgs } from './get-service-args';

export const getRuntimePackageInfoFilePath = () => {

  const serviceArgs = getServiceArgs();

  return path.resolve(
    serviceArgs.runtimePackageDirPath,
    `package.json`,
  );
};
