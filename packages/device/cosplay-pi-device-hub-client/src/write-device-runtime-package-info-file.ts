import * as fs from 'fs';

import { DeviceRuntimeConfig } from 'cosplay-pi-device-hub-client-protocol';

import { getDeviceRuntimePackageInfoFilePath } from './get-device-runtime-package-info-file-path';
import { generateDeviceRuntimePackageInfo } from './generate-device-runtime-package-info';

export const writeDeviceRuntimePackageInfoFile = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  const deviceRuntimePackageInfoFilePath = getDeviceRuntimePackageInfoFilePath();

  const deviceRuntimePackageInfo = generateDeviceRuntimePackageInfo({
    deviceRuntimeConfig,
  });

  const deviceRuntimePackageInfoAsJson = JSON.stringify(
    deviceRuntimePackageInfo,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceRuntimePackageInfoFilePath,
    deviceRuntimePackageInfoAsJson,
    `utf8`,
  );
};
