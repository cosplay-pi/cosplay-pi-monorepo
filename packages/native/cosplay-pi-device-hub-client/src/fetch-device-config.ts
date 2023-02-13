import * as fs from 'fs';

import { DeviceConfig } from './device-config';
import { deviceConfigFilePath } from './env';

export const fetchDeviceConfig = (): DeviceConfig => {

  if (!fs.existsSync(deviceConfigFilePath)) {

    return {
      runtime: {
        modules: {
        },
      },
    };
  }

  const deviceConfig = JSON.parse(
    fs.readFileSync(
      deviceConfigFilePath,
      `utf-8`,
    ),
  );

  return deviceConfig;
};
