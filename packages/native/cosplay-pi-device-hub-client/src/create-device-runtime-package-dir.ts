import * as fs from "fs";

import { deviceRuntimeDirPath } from "./env";

export const createDeviceRuntimePackageDir = () => {

  fs.mkdirSync(
    deviceRuntimeDirPath,
    {
      recursive: true,
    },
  );
};
