import * as fs from 'fs';

import * as _ from './_';

export const writeRuntimePackageInfoFile = (
  {
    config,
  }: {
    config: _.Config,
  },
) => {

  const runtimePackageInfoFilePath = _.getRuntimePackageInfoFilePath();

  const runtimePackageInfo = _.generateRuntimePackageInfo({
    config,
  });

  const runtimePackageInfoAsJson = JSON.stringify(
    runtimePackageInfo,
    undefined,
    2,
  );

  fs.writeFileSync(
    runtimePackageInfoFilePath,
    runtimePackageInfoAsJson,
    `utf8`,
  );
};
