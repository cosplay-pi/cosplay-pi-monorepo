import { spawn } from "child_process";

import {
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
} from "./device-runtime-process";
import { deviceRuntimeDirPath } from "./env";
import { fetchDeviceRuntimeConfig } from "./fetch-device-runtime-config";
import { fetchDeviceRuntimeLastConfig } from "./fetch-device-runtime-last-config";
import { getDeviceRuntimeMainScriptFileName } from "./get-device-runtime-main-script-file-name";
import { installDeviceRuntime } from "./install-device-runtime";

export const startDeviceRuntime = async () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  const deviceRuntimeLastConfig = fetchDeviceRuntimeLastConfig();

  if (
    JSON.stringify(deviceRuntimeConfig)
    !==
    JSON.stringify(deviceRuntimeLastConfig)
  ) {

    await installDeviceRuntime();
  }

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
