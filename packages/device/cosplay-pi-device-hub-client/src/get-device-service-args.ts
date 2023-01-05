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
      `device-config-file-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .option(
      `device-public-key-file-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .option(
      `device-runtime-package-dir-path`,
      {
        type: `string`,
        demandOption: true,
      },
    )
    .parseSync();

  const deviceServiceArgs: DeviceServiceArgs = {
    deviceConfigFilePath: argv.deviceConfigFilePath,
    devicePublicKeyFilePath: argv.devicePublicKeyFilePath,
    deviceRuntimePackageDirPath: argv.deviceRuntimePackageDirPath,
  };

  setDeviceServiceCachedArgs(deviceServiceArgs);

  return deviceServiceArgs;
};
