import * as path from 'path';

import { getServiceArgs } from './get-service-args';
import { mainScriptFileName } from './main-script-file-name';

export const getRuntimeMainScriptFilePath = () => {

  const serviceArgs = getServiceArgs();

  return path.resolve(
    serviceArgs.runtimePackageDirPath,
    mainScriptFileName,
  );
};
