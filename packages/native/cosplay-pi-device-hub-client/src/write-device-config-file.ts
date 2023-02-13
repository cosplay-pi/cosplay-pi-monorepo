import * as fs from 'fs';

import { DeviceConfig } from './device-config';
import { deviceConfigFilePath } from './env';

export const writeDeviceConfigFile = ({
  deviceConfig,
}: {
  deviceConfig: DeviceConfig,
}) => {

  const deviceConfigAsJson = JSON.stringify(
    deviceConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    deviceConfigFilePath,
    deviceConfigAsJson,
  );
};
