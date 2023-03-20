import { spawn } from "child_process";

import {
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
} from "./device-runtime-process";
import { deviceRuntimeDirPath } from "./env";
import { getDeviceRuntimeMainScriptFileName } from "./get-device-runtime-main-script-file-name";
import { installDeviceRuntime } from "./install-device-runtime";

export const startDeviceRuntime = async () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  await installDeviceRuntime();

  const deviceRuntimeProcess = spawn(
    `node --preserve-symlinks ${getDeviceRuntimeMainScriptFileName()}`,
    {
      shell: true,
      cwd: deviceRuntimeDirPath,
      stdio: `inherit`,
    },
  );

  setDeviceRuntimeProcess(deviceRuntimeProcess);
};
