import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ServiceArgs } from './service-args';
import { fetchServiceCachedArgs, setServiceCachedArgs } from './service-cached-args';

export const getServiceArgs = () => {

  const serviceLastCachedArgs = fetchServiceCachedArgs();

  if (serviceLastCachedArgs !== undefined) {

    return serviceLastCachedArgs;
  }

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

  const serviceArgs: ServiceArgs = {
    runtimePackageDirPath: argv.runtimePackageDirPath,
    configFilePath: argv.configFilePath,
  };

  setServiceCachedArgs(serviceArgs);

  return serviceArgs;
};
