import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { DeviceServiceArgs } from './device-service-args';
import { fetchDeviceServiceCachedArgs, setDeviceServiceCachedArgs } from './device-service-cached-args';

export const getDeviceServiceArgs = () => {

  const deviceServiceLastCachedArgs = fetchDeviceServiceCachedArgs();

  if (deviceServiceLastCachedArgs !== undefined) {

    return deviceServiceLastCachedArgs;
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

  const deviceServiceArgs: DeviceServiceArgs = {
    runtimePackageDirPath: argv.runtimePackageDirPath,
    configFilePath: argv.configFilePath,
  };

  setDeviceServiceCachedArgs(deviceServiceArgs);

  return deviceServiceArgs;
};
