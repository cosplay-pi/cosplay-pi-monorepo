import * as path from 'path';

import { retrieveArgs } from './retrieve-args';

export const fetchRuntimePackageInfoFilePath = () => {

  const args = retrieveArgs();

  return path.join(
    args.runtimePackageDirPath,
    `package.json`,
  );
};
