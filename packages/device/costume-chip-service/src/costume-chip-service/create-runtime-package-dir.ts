import * as fs from "fs";

import { retrieveArgs } from "./retrieve-args";

export const createRuntimePackageDir = () => {

  const args = retrieveArgs();

  fs.mkdirSync(
    args.runtimePackageDirPath,
    {
      recursive: true,
    }
  );
};
