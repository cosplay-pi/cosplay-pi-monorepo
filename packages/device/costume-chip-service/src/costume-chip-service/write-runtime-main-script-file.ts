import * as fs from 'fs';

import * as _ from './_';

import { getRuntimeMainScriptFilePath } from './get-runtime-main-script-file-path';
import { generateRuntimeMainScript } from './generate-runtime-main-script';

export const writeRuntimeMainScriptFile = ({
  runtimeConfig,
}: {
  runtimeConfig: _.RuntimeConfig,
}) => {

  const runtimeMainScriptFilePath = getRuntimeMainScriptFilePath();

  const runtimeMainScript = generateRuntimeMainScript({
    runtimeConfig,
  });

  fs.writeFileSync(
    runtimeMainScriptFilePath,
    runtimeMainScript,
    `utf8`,
  );
};
