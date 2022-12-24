import * as fs from 'fs';

import { RuntimeConfig } from 'costume-chip-service-protocol';

import { getRuntimeMainScriptFilePath } from './get-runtime-main-script-file-path';
import { generateRuntimeMainScript } from './generate-runtime-main-script';

export const writeRuntimeMainScriptFile = ({
  runtimeConfig,
}: {
  runtimeConfig: RuntimeConfig,
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
