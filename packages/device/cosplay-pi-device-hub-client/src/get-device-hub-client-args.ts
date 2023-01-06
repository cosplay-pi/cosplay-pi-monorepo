import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { DeviceHubClientArgs } from './device-hub-client-args';
import {
  fetchDeviceHubClientCachedArgs,
  setDeviceHubClientCachedArgs,
} from './device-hub-client-cached-args';

export const getDeviceHubClientArgs = () => {

  const deviceHubClientLastCachedArgs = fetchDeviceHubClientCachedArgs();

  if (deviceHubClientLastCachedArgs !== undefined) {

    return deviceHubClientLastCachedArgs;
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

  const deviceHubClientArgs: DeviceHubClientArgs = {
    deviceConfigFilePath: argv.deviceConfigFilePath,
    devicePublicKeyFilePath: argv.devicePublicKeyFilePath,
    deviceRuntimePackageDirPath: argv.deviceRuntimePackageDirPath,
  };

  setDeviceHubClientCachedArgs(deviceHubClientArgs);

  return deviceHubClientArgs;
};
