import { spawn } from "child_process";

import {
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
} from "./device-runtime-process";
import { deviceRuntimeDirPath } from "./env";
import { getDeviceRuntimeMainScriptFileName } from "./get-device-runtime-main-script-file-name";

export const startDeviceRuntimeAsync = async () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeProcess = spawn(
    `node ${getDeviceRuntimeMainScriptFileName()}`,
    {
      shell: true,
      cwd: deviceRuntimeDirPath,
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
