import * as fs from 'fs';

import { DeviceConfig } from './device-config';
import { getDeviceHubClientArgs } from './get-device-hub-client-args';

export const fetchDeviceConfig = (): DeviceConfig => {

  const deviceHubClientArgs = getDeviceHubClientArgs();

  if (!fs.existsSync(deviceHubClientArgs.deviceConfigFilePath)) {

    return {
      runtime: {
        modules: {
        },
      },
    };
  }

  const deviceConfig = JSON.parse(
    fs.readFileSync(
      deviceHubClientArgs.deviceConfigFilePath,
      `utf8`,
    ),
  );

  return deviceConfig;
};
