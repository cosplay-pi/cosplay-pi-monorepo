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
      `device-runtime-package-dir-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .option(
      `device-config-file-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .parseSync();

  const deviceServiceArgs: DeviceServiceArgs = {
    deviceRuntimePackageDirPath: argv.deviceRuntimePackageDirPath,
    deviceConfigFilePath: argv.deviceConfigFilePath,
  };

  setDeviceServiceCachedArgs(deviceServiceArgs);

  return deviceServiceArgs;
};
