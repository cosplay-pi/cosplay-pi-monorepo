import * as fs from 'fs';

import { DeviceRuntimeConfig } from 'cosplay-pi-device-hub-backend-protocol';

import { generateDeviceRuntimeMainScript } from './generate-device-runtime-main-script';
import { getDeviceRuntimeMainScriptFilePath } from './get-device-runtime-main-script-file-path';

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
