import { DeviceRuntimeConfig } from 'costume-chip-service-protocol';

import { fetchDeviceConfig } from './fetch-device-config';
import { writeDeviceConfigFile } from './write-device-config-file';

export const updateDeviceRuntimeConfig = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig;
}) => {

  const deviceLastConfig = fetchDeviceConfig();

  const deviceConfig = {
    ...deviceLastConfig,
    runtimeConfig: deviceRuntimeConfig,
  };

  writeDeviceConfigFile({
    deviceConfig,
  });
};
