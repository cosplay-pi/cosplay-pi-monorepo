import * as fs from "fs";

import { getServiceArgs } from "./get-service-args";

export const createRuntimePackageDir = () => {

  const serviceArgs = getServiceArgs();

  fs.mkdirSync(
    serviceArgs.runtimePackageDirPath,
    {
      recursive: true,
    }
  );
};
