import { spawn } from "child_process";

import { Config } from "./config";
import { retrieveArgs } from "./retrieve-args";
import { createRuntimePackageDir } from "./create-runtime-package-dir";
import { writeRuntimePackageInfoFile } from "./write-runtime-package-info-file";

export const installRuntimePackageAsync = async (
  {
    config,
  }: {
    config: Config,
  },
) => {

  const args = retrieveArgs();

  createRuntimePackageDir();

  writeRuntimePackageInfoFile({
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
