import * as path from 'path';

import * as _ from './_';

export const getRuntimePackageInfoFilePath = () => {

  const args = _.retrieveArgs();

  return path.resolve(
    args.runtimePackageDirPath,
    `package.json`,
  );
};
