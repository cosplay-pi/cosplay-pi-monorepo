import * as fs from 'fs';

import * as _ from './_';

export const writeConfigFile = (
  {
    config,
  }: {
    config: _.Config,
  },
) => {

  const args = _.retrieveArgs();


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
