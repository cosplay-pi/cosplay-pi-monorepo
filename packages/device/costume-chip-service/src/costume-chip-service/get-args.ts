import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as _ from './_';

export const getArgs = () => {

  const argv = yargs(hideBin(process.argv))
    .option(
      `runtime-package-dir-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .option(
      `config-file-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .parseSync();

  const args: _.Args = {
    runtimePackageDirPath: argv.runtimePackageDirPath,
    configFilePath: argv.configFilePath,
  };

  _.setCachedArgs(args);

  return args;
};
