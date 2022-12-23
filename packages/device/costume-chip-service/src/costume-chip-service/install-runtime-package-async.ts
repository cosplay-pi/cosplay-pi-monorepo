import { spawn } from "child_process";

import * as _ from './_';

export const installRuntimePackageAsync = async (
  {
    config,
  }: {
    config: _.Config,
  },
) => {

  const args = _.retrieveArgs();

  _.createRuntimePackageDir();

  _.writeRuntimePackageInfoFile({
    config,
  });

  const yarnInstallRuntimePackageProcess = spawn(
    `yarn`,
    {
      shell: true,
      cwd: args.runtimePackageDirPath,
      stdio: `inherit`,
    },
  );

  await new Promise<void>((resolvePromise, rejectPromise) => {

    yarnInstallRuntimePackageProcess.on(`exit`, (code) => {

      if (code === 0) {

        resolvePromise();

      } else {

        rejectPromise(new Error());
      }
    });
  });
};
