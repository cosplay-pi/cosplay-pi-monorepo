import { spawn } from "child_process";

import { retrieveArgs } from "./retrieve-args";
import { fetchRuntimeProcess, setRuntimeProcess } from "./runtime-process";
import { fetchConfig } from "./fetch-config";
import { installRuntimePackageAsync } from "./install-runtime-package-async";
import { writeRuntimeMainScriptFile } from "./write-runtime-main-script-file";
import { mainScriptFileName } from "./main-script-file-name";

export const startRuntimeAsync = async () => {

  const args = retrieveArgs();

  const lastRuntimeProcess = fetchRuntimeProcess();

  if (lastRuntimeProcess !== undefined) {

    throw new Error();
  }

  const config = fetchConfig();

  await installRuntimePackageAsync({
    config,
  });

  writeRuntimeMainScriptFile({
    config,
  });

  const runtimeProcess = spawn(
    `node ${mainScriptFileName}`,
    {
      shell: true,
      cwd: args.runtimePackageDirPath,
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
