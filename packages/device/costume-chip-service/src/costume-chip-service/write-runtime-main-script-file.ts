import * as fs from 'fs';

import { Config } from './config';
import { getRuntimeMainScriptFilePath } from './get-runtime-main-script-file-path';
import { generateRuntimeMainScript } from './generate-runtime-main-script';

export const writeRuntimeMainScriptFile = (
  {
    config,
  }: {
    config: Config,
  },
) => {

  const runtimeMainScriptFilePath = getRuntimeMainScriptFilePath();

  const runtimeMainScript = generateRuntimeMainScript({
    config,
  });

  fs.writeFileSync(
    runtimeMainScriptFilePath,
    runtimeMainScript,
    `utf8`,
  );
};
