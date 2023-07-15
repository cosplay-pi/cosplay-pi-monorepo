import * as fs from 'fs';

import { createDeviceRuntimeDir } from './create-device-runtime-dir';
import { DeviceRuntimeConfig } from './device-runtime-config';
import { fetchDeviceRuntimeProcess } from './device-runtime-process';
import { getDeviceRuntimeLastConfigFilePath } from './get-device-runtime-last-config-file-path';

export const setDeviceRuntimeLastConfig = ({
  deviceRuntimeLastConfig,
}: {
  deviceRuntimeLastConfig: DeviceRuntimeConfig;
}) => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  createDeviceRuntimeDir();

  const deviceRuntimeLastConfigFilePath = getDeviceRuntimeLastConfigFilePath();

  const deviceRuntimeLastConfigAsJson = JSON.stringify(
    deviceRuntimeLastConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceRuntimeLastConfigFilePath,
    deviceRuntimeLastConfigAsJson,
  );
};
