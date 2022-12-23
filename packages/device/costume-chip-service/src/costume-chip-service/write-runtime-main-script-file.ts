import * as fs from 'fs';

import * as _ from './_';

export const writeRuntimeMainScriptFile = (
  {
    config,
  }: {
    config: _.Config,
  },
) => {

  const runtimeMainScriptFilePath = _.getRuntimeMainScriptFilePath();

  const runtimeMainScript = _.generateRuntimeMainScript({
    config,
  });

  fs.writeFileSync(
    runtimeMainScriptFilePath,
    runtimeMainScript,
    `utf8`,
  );
};
