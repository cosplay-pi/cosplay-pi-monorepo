import * as fs from 'fs';

import { DeviceServiceConfig } from './device-service-config';
import { getDeviceServiceArgs } from './get-device-service-args';

export const fetchDeviceServiceConfig = (): DeviceServiceConfig => {

  const deviceServiceArgs = getDeviceServiceArgs();

  if (!fs.existsSync(deviceServiceArgs.configFilePath)) {

    return {
      runtime: {
        modules: {
        },
      },
    };
  }

  const deviceServiceConfig = JSON.parse(
    fs.readFileSync(
      deviceServiceArgs.configFilePath,
      `utf8`,
    ),
  );

  return deviceServiceConfig;
};
