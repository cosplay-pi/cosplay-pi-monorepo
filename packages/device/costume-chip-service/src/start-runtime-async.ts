import { spawn } from "child_process";

import { getServiceArgs } from "./get-service-args";
import { fetchRuntimeProcess, setRuntimeProcess } from "./runtime-process";
import { mainScriptFileName } from "./main-script-file-name";

export const startRuntimeAsync = async () => {

  const serviceArgs = getServiceArgs();

  const lastRuntimeProcess = fetchRuntimeProcess();

  if (lastRuntimeProcess !== undefined) {

    throw new Error();
  }

  const runtimeProcess = spawn(
    `node ${mainScriptFileName}`,
    {
      shell: true,
      cwd: serviceArgs.runtimePackageDirPath,
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
