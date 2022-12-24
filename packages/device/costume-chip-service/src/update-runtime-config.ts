import { RuntimeConfig } from 'costume-chip-service-protocol';

import { fetchDeviceServiceConfig } from './fetch-device-service-config';
import { writeDeviceServiceConfigFile } from './write-device-service-config-file';

export const updateRuntimeConfig = ({
  runtimeConfig,
}: {
  runtimeConfig: RuntimeConfig;
}) => {

  const deviceServiceLastConfig = fetchDeviceServiceConfig();

  const deviceServiceConfig = {
    ...deviceServiceLastConfig,
    runtimeConfig,
  };

  writeDeviceServiceConfigFile({
    deviceServiceConfig,
  });
};
