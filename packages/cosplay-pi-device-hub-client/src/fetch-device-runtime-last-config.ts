import * as fs from 'fs';

import { DeviceRuntimeConfig } from './device-runtime-config';
import { getDeviceRuntimeLastConfigFilePath } from './get-device-runtime-last-config-file-path';

export const fetchDeviceRuntimeLastConfig = (): DeviceRuntimeConfig | undefined => {

  const deviceRuntimeLastConfigFilePath = getDeviceRuntimeLastConfigFilePath();

  if (!fs.existsSync(deviceRuntimeLastConfigFilePath)) {

    return undefined;
  }

  const deviceRuntimeLastConfig = JSON.parse(
    fs.readFileSync(
      deviceRuntimeLastConfigFilePath,
      `utf-8`,
    ),
  );

  return deviceRuntimeLastConfig;
};
