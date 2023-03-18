import * as fs from 'fs';

import { DeviceRuntimeConfig } from './device-runtime-config';
import { getDeviceRuntimeConfigFilePath } from './get-device-runtime-config-file-path';

export const fetchDeviceRuntimeConfig = (): DeviceRuntimeConfig => {

  const deviceRuntimeConfigFilePath = getDeviceRuntimeConfigFilePath();

  if (!fs.existsSync(deviceRuntimeConfigFilePath)) {

    return {
      modules: {
      },
    };
  }

  const deviceRuntimeConfig = JSON.parse(
    fs.readFileSync(
      deviceRuntimeConfigFilePath,
      `utf-8`,
    ),
  );

  return deviceRuntimeConfig;
};
