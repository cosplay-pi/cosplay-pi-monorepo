import { RuntimeConfig } from 'costume-chip-service-protocol';

import { fetchServiceConfig } from './fetch-config';
import { writeServiceConfigFile } from './write-service-config-file';

export const updateRuntimeConfig = ({
  runtimeConfig,
}: {
  runtimeConfig: RuntimeConfig;
}) => {

  const serviceLastConfig = fetchServiceConfig();

  const serviceConfig = {
    ...serviceLastConfig,
    runtimeConfig,
  };

  writeServiceConfigFile({
    serviceConfig,
  });
};
