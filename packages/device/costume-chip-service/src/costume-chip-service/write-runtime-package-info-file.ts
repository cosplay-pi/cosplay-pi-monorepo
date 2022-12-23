import * as fs from 'fs';

import * as _ from './_';

import { getRuntimePackageInfoFilePath } from './get-runtime-package-info-file-path';
import { generateRuntimePackageInfo } from './generate-runtime-package-info';

export const writeRuntimePackageInfoFile = ({
  runtimeConfig,
}: {
  runtimeConfig: _.RuntimeConfig,
}) => {

  const runtimePackageInfoFilePath = getRuntimePackageInfoFilePath();

  const runtimePackageInfo = generateRuntimePackageInfo({
    runtimeConfig,
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
