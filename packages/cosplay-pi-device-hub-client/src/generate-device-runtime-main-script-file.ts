import * as fs from 'fs';

import { fetchDeviceRuntimeProcess } from './device-runtime-process';
import { fetchDeviceRuntimeConfig } from './fetch-device-runtime-config';
import { getDeviceRuntimeMainScriptFilePath } from './get-device-runtime-main-script-file-path';

export const generateDeviceRuntimeMainScriptFile = () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  const deviceRuntimeMainScriptFilePath = getDeviceRuntimeMainScriptFilePath();

  let deviceRuntimeMainScript = `setInterval(() => console.log('Hi'), 1000);\n`;

  for (const deviceRuntimeModuleName in deviceRuntimeConfig.modules) {

    deviceRuntimeMainScript += `require('${deviceRuntimeModuleName}');\n`;
  }

  fs.writeFileSync(
    deviceRuntimeMainScriptFilePath,
    deviceRuntimeMainScript,
    `utf8`,
  );
};
