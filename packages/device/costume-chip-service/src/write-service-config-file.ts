import * as fs from 'fs';

import { ServiceConfig } from './service-config';
import { getServiceArgs } from './get-service-args';

export const writeServiceConfigFile = ({
  serviceConfig,
}: {
  serviceConfig: ServiceConfig,
}) => {

  const serviceArgs = getServiceArgs();

  const serviceConfigAsJson = JSON.stringify(
    serviceConfig,
    undefined,
    2,
  );

  fs.writeFileSync(
    serviceArgs.configFilePath,
    serviceConfigAsJson,
  );
};
