import * as fs from 'fs';

import { DeviceConfig } from './device-config';
import { getDeviceServiceArgs } from './get-device-service-args';

export const writeDeviceConfigFile = ({
  deviceConfig,
}: {
  deviceConfig: DeviceConfig,
}) => {

  const deviceServiceArgs = getDeviceServiceArgs();

  const deviceConfigAsJson = JSON.stringify(
    deviceConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceServiceArgs.deviceConfigFilePath,
    deviceConfigAsJson,
  );
};
