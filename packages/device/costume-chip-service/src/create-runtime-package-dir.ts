import * as fs from "fs";

import { getDeviceServiceArgs } from "./get-device-service-args";

export const createRuntimePackageDir = () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  fs.mkdirSync(
    deviceServiceArgs.runtimePackageDirPath,
    {
      recursive: true,
    }
  );
};
