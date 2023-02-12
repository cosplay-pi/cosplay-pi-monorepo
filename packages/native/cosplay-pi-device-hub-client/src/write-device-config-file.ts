import * as fs from 'fs';

import { DeviceConfig } from './device-config';
import { getDeviceHubClientArgs } from './get-device-hub-client-args';

export const writeDeviceConfigFile = ({
  deviceConfig,
}: {
  deviceConfig: DeviceConfig,
}) => {

  const deviceHubClientArgs = getDeviceHubClientArgs();

  const deviceConfigAsJson = JSON.stringify(
    deviceConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceHubClientArgs.deviceConfigFilePath,
    deviceConfigAsJson,
  );
};
