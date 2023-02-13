import * as fs from "fs";

import { deviceRuntimeDirPath } from "./env";

export const createDeviceRuntimeDir = () => {

  fs.mkdirSync(
    deviceRuntimeDirPath,
    {
      recursive: true,
    },
  );
};
