import * as fs from 'fs';

import { fetchDeviceRuntimeProcess } from './device-runtime-process';
import { fetchDeviceRuntimeConfig } from './fetch-device-runtime-config';
import { getDeviceRuntimeInfoFilePath } from './get-device-runtime-info-file-path';

export const generateDeviceRuntimeInfoFile = () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  const deviceRuntimeInfoFilePath = getDeviceRuntimeInfoFilePath();

  const deviceRuntimeInfo = {
    dependencies: {},
  };

  for (const deviceRuntimeModuleName in deviceRuntimeConfig.modules) {

    const deviceRuntimeModuleConfig =
      deviceRuntimeConfig.modules[deviceRuntimeModuleName];

    Object.assign(
      deviceRuntimeInfo.dependencies,
      {
        [deviceRuntimeModuleName]: deviceRuntimeModuleConfig.version,
      },
    );
  }

  const deviceRuntimeInfoAsJson = JSON.stringify(
    deviceRuntimeInfo,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceRuntimeInfoFilePath,
    deviceRuntimeInfoAsJson,
    `utf8`,
  );
};
