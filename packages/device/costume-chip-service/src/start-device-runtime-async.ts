import { spawn } from "child_process";

import { getDeviceServiceArgs } from "./get-device-service-args";
import { fetchDeviceRuntimeProcess, setDeviceRuntimeProcess } from "./device-runtime-process";
import { getDeviceRuntimeMainScriptFileName } from "./get-device-runtime-main-script-file-name";

export const startDeviceRuntimeAsync = async () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeProcess = spawn(
    `node ${getDeviceRuntimeMainScriptFileName()}`,
    {
      shell: true,
      cwd: deviceServiceArgs.deviceRuntimePackageDirPath,
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
