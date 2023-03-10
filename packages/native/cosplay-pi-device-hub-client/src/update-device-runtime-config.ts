import { DeviceRuntimeConfig } from 'cosplay-pi-hub-backend-protocol';

import { DeviceConfig } from './device-config';
import { fetchDeviceConfig } from './fetch-device-config';
import { writeDeviceConfigFile } from './write-device-config-file';

export const updateDeviceRuntimeConfig = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig;
}) => {

  const deviceLastConfig = fetchDeviceConfig();

  const deviceConfig: DeviceConfig = {
    ...deviceLastConfig,
    runtime: deviceRuntimeConfig,
  };

  writeDeviceConfigFile({
    deviceConfig,
  });
};
