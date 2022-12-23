import { spawn } from "child_process";

import * as _ from './_';

import { retrieveArgs } from "./retrieve-args";
import { createRuntimePackageDir } from "./create-runtime-package-dir";
import { writeRuntimePackageInfoFile } from "./write-runtime-package-info-file";
import { writeRuntimeMainScriptFile } from "./write-runtime-main-script-file";
import { updateRuntimeConfig } from "./update-runtime-config";

export const installRuntimeAsync = async ({
  runtimeConfig,
}: {
  runtimeConfig: _.RuntimeConfig,
}) => {

  const args = retrieveArgs();

  createRuntimePackageDir();

  writeRuntimePackageInfoFile({
    runtimeConfig,
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

  writeRuntimeMainScriptFile({
    runtimeConfig,
  });

  updateRuntimeConfig({
    runtimeConfig,
  });
};
