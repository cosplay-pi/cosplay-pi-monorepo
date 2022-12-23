import * as fs from 'fs';

import { Config } from "./config";
import { fetchRuntimePackageInfoFilePath } from "./fetch-runtime-package-info-file-path";
import { generateRuntimePackageInfo } from "./generate-runtime-package-info";

export const writeRuntimePackageInfoFile = (
  {
    config,
  }: {
    config: Config,
  },
) => {

  const runtimePackageInfoFilePath = fetchRuntimePackageInfoFilePath();

  const runtimePackageInfo = generateRuntimePackageInfo({
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
  );
};
