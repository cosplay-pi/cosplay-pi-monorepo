import { spawn } from "child_process";

import { getDeviceServiceArgs } from "./get-device-service-args";
import { fetchRuntimeProcess, setRuntimeProcess } from "./runtime-process";
import { mainScriptFileName } from "./main-script-file-name";

export const startRuntimeAsync = async () => {

  const deviceServiceArgs = getDeviceServiceArgs();

  const lastRuntimeProcess = fetchRuntimeProcess();

  if (lastRuntimeProcess !== undefined) {

    throw new Error();
  }

  const runtimeProcess = spawn(
    `node ${mainScriptFileName}`,
    {
      shell: true,
      cwd: deviceServiceArgs.runtimePackageDirPath,
      stdio: `pipe`,
    },
  );

  runtimeProcess.stdout.on(
    `data`,
    (data) => {

      console.log(String(data));
    },
  );

  setRuntimeProcess(runtimeProcess);
};
