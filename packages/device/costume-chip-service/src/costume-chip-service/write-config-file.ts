import * as fs from 'fs';

import { Config } from "./config";
import { retrieveArgs } from './retrieve-args';

export const writeConfigFile = (
  {
    config,
  }: {
    config: Config,
  },
) => {

  const args = retrieveArgs();


  const configAsJson = JSON.stringify(
    config,
    undefined,
    2,
  );

  fs.writeFileSync(
    args.configFilePath,
    configAsJson,
  );
};
