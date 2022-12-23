import * as fs from "fs";

import * as _ from './_';

export const createRuntimePackageDir = () => {

  const args = _.retrieveArgs();

  fs.mkdirSync(
    args.runtimePackageDirPath,
    {
      recursive: true,
    }
  );
};
