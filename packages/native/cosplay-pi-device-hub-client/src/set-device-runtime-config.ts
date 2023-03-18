import * as fs from 'fs';

import { createDeviceRuntimeDir } from './create-device-runtime-dir';
import { DeviceRuntimeConfig } from './device-runtime-config';
import { fetchDeviceRuntimeProcess } from './device-runtime-process';
import { getDeviceRuntimeConfigFilePath } from './get-device-runtime-config-file-path';

export const setDeviceRuntimeConfig = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig;
}) => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  createDeviceRuntimeDir();

  const deviceRuntimeConfigFilePath = getDeviceRuntimeConfigFilePath();

  const deviceRuntimeConfigAsJson = JSON.stringify(
    deviceRuntimeConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceRuntimeConfigFilePath,
    deviceRuntimeConfigAsJson,
  );
};
