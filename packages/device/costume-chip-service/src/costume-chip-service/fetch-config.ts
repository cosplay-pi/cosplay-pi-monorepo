import * as fs from 'fs';

import * as _ from './_';

export const fetchConfig = (): _.Config => {

  const args = _.retrieveArgs();

  if (!fs.existsSync(args.configFilePath)) {

    return {
      runtimeModules: {},
    };
  }

  const config = JSON.parse(
    fs.readFileSync(
      args.configFilePath,
      `utf8`,
    ),
  );

  return config;
};
