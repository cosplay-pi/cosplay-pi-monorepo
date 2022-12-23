import * as path from 'path';

import * as _ from './_';

export const getRuntimeMainScriptFilePath = () => {

  const args = _.retrieveArgs();

  return path.resolve(
    args.runtimePackageDirPath,
    _.mainScriptFileName,
  );
};
