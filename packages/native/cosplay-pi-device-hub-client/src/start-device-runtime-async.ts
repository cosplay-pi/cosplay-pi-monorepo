import { spawn } from "child_process";

import {
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
} from "./device-runtime-process";
import { getDeviceHubClientArgs } from "./get-device-hub-client-args";
import { getDeviceRuntimeMainScriptFileName } from "./get-device-runtime-main-script-file-name";

export const startDeviceRuntimeAsync = async () => {

  const deviceHubClientArgs = getDeviceHubClientArgs();

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeProcess = spawn(
    `node ${getDeviceRuntimeMainScriptFileName()}`,
    {
      shell: true,
      cwd: deviceHubClientArgs.deviceRuntimePackageDirPath,
      stdio: `pipe`,
    },
  );

  deviceRuntimeProcess.stdout.on(
    `data`,
    (data) => {

      console.log(String(data));
    },
  );

  setDeviceRuntimeProcess(deviceRuntimeProcess);
};
