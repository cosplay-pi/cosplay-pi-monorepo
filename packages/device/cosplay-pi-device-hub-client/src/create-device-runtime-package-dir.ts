import * as fs from "fs";

import { getDeviceHubClientArgs } from "./get-device-hub-client-args";

export const createDeviceRuntimePackageDir = () => {

  const deviceHubClientArgs = getDeviceHubClientArgs();

  fs.mkdirSync(
    deviceHubClientArgs.deviceRuntimePackageDirPath,
    {
      recursive: true,
    }
  );
};
