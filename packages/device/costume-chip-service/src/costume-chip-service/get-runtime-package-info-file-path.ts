import * as path from 'path';

import { retrieveArgs } from './retrieve-args';

export const getRuntimePackageInfoFilePath = () => {

  const args = retrieveArgs();

  return path.resolve(
    args.runtimePackageDirPath,
    `package.json`,
  );
};
