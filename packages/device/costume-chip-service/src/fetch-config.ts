import * as fs from 'fs';

import { ServiceConfig } from './service-config';
import { getServiceArgs } from './get-service-args';

export const fetchServiceConfig = (): ServiceConfig => {

  const serviceArgs = getServiceArgs();

  if (!fs.existsSync(serviceArgs.configFilePath)) {

    return {
      runtime: {
        modules: {
        },
      },
    };
  }

  const serviceConfig = JSON.parse(
    fs.readFileSync(
      serviceArgs.configFilePath,
      `utf8`,
    ),
  );

  return serviceConfig;
};
