import * as _ from './_';

import { fetchConfig } from './fetch-config';
import { writeConfigFile } from './write-config-file';

export const updateRuntimeConfig = ({
  runtimeConfig,
}: {
  runtimeConfig: _.RuntimeConfig;
}) => {

  const lastConfig = fetchConfig();

  const newConfig = {
    ...lastConfig,
    runtimeConfig,
  };
  
  writeConfigFile({
    config: newConfig,
  });
};
