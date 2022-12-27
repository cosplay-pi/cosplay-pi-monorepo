import * as fs from "fs";

import { getDeviceServiceArgs } from "./get-device-service-args";

export const createDeviceRuntimePackageDir = () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  fs.mkdirSync(
    deviceServiceArgs.deviceRuntimePackageDirPath,
    {
      recursive: true,
    }
  );
};
