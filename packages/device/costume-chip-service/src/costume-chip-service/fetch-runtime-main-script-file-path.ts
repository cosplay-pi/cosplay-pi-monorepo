import * as path from 'path';

import { retrieveArgs } from './retrieve-args';
import { mainScriptFileName } from './main-script-file-name';

export const fetchRuntimeMainScriptFilePath = () => {

  const args = retrieveArgs();

  return path.join(
    args.runtimePackageDirPath,
    mainScriptFileName,
  );
};
