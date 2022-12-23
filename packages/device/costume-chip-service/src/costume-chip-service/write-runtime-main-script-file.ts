import * as fs from 'fs';

import { Config } from "./config";
import { fetchRuntimeMainScriptFilePath } from './fetch-runtime-main-script-file-path';
import { generateRuntimeMainScript } from './generate-runtime-main-script';

export const writeRuntimeMainScriptFile = (
  {
    config,
  }: {
    config: Config,
  },
) => {

  const runtimeMainScriptFilePath = fetchRuntimeMainScriptFilePath();

  const runtimeMainScript = generateRuntimeMainScript({
    config,
  });

  fs.writeFileSync(
    runtimeMainScriptFilePath,
    runtimeMainScript,
  );
};
