import { spawn } from "child_process";

import * as _ from './_';

export const startRuntimeAsync = async () => {

  const args = _.retrieveArgs();

  const lastRuntimeProcess = _.fetchRuntimeProcess();

  if (lastRuntimeProcess !== undefined) {

    throw new Error();
  }

  const config = _.fetchConfig();

  await _.installRuntimePackageAsync({
    config,
  });

  _.writeRuntimeMainScriptFile({
    config,
  });

  const runtimeProcess = spawn(
    `node ${_.mainScriptFileName}`,
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

  _.setRuntimeProcess(runtimeProcess);
};
