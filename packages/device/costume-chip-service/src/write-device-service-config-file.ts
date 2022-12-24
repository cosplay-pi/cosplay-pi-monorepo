import * as fs from 'fs';

import { DeviceServiceConfig } from './device-service-config';
import { getDeviceServiceArgs } from './get-device-service-args';

export const writeDeviceServiceConfigFile = ({
  deviceServiceConfig,
}: {
  deviceServiceConfig: DeviceServiceConfig,
}) => {

  const deviceServiceArgs = getDeviceServiceArgs();

  const deviceServiceConfigAsJson = JSON.stringify(
    deviceServiceConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceServiceArgs.configFilePath,
    deviceServiceConfigAsJson,
  );
};
