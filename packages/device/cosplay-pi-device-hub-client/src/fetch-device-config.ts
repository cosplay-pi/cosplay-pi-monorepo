import * as fs from 'fs';

import { DeviceConfig } from './device-config';
import { getDeviceServiceArgs } from './get-device-service-args';

export const fetchDeviceConfig = (): DeviceConfig => {

  const deviceServiceArgs = getDeviceServiceArgs();

  if (!fs.existsSync(deviceServiceArgs.deviceConfigFilePath)) {

    return {
      runtime: {
        modules: {
        },
      },
    };
  }

  const deviceConfig = JSON.parse(
    fs.readFileSync(
      deviceServiceArgs.deviceConfigFilePath,
      `utf8`,
    ),
  );

  return deviceConfig;
};
