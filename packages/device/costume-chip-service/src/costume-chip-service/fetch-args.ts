import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Args } from './args';
import { setCachedArgs } from './cached-args';

export const fetchArgs = () => {

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

  const args: Args = {
    runtimePackageDirPath: argv.runtimePackageDirPath,
    configFilePath: argv.configFilePath,
  };

  setCachedArgs(args);

  return args;
};
