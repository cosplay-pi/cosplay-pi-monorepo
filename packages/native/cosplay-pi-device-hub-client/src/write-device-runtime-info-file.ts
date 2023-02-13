import * as fs from 'fs';

import { DeviceRuntimeConfig } from 'cosplay-pi-hub-backend-protocol';

import { generateDeviceRuntimeInfo } from './generate-device-runtime-info';
import { getDeviceRuntimeInfoFilePath } from './get-device-runtime-info-file-path';

export const writeDeviceRuntimeInfoFile = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  const deviceRuntimeInfoFilePath = getDeviceRuntimeInfoFilePath();

  const deviceRuntimeInfo = generateDeviceRuntimeInfo({
    deviceRuntimeConfig,
  });

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
