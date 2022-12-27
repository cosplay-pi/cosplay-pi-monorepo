import * as fs from 'fs';

import { DeviceRuntimeConfig } from 'costume-chip-service-protocol';

import { getDeviceRuntimeMainScriptFilePath } from './get-device-runtime-main-script-file-path';
import { generateDeviceRuntimeMainScript } from './generate-device-runtime-main-script';

export const writeDeviceRuntimeMainScriptFile = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  const deviceRuntimeMainScriptFilePath = getDeviceRuntimeMainScriptFilePath();

  const deviceRuntimeMainScript = generateDeviceRuntimeMainScript({
    deviceRuntimeConfig,
  });

  fs.writeFileSync(
    deviceRuntimeMainScriptFilePath,
    deviceRuntimeMainScript,
    `utf8`,
  );
};
