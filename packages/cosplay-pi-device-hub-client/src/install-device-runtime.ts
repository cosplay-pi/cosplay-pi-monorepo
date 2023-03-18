import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

import { createDeviceRuntimeDir } from "./create-device-runtime-dir";
import { fetchDeviceRuntimeProcess } from "./device-runtime-process";
import { deviceRuntimeDirPath } from "./env";
import { generateDeviceRuntimeInfoFile } from "./generate-device-runtime-info-file";
import { generateDeviceRuntimeMainScriptFile } from "./generate-device-runtime-main-script-file";

export const installDeviceRuntime = async () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  createDeviceRuntimeDir();

  generateDeviceRuntimeInfoFile();

  fs.writeFileSync(
    path.resolve(
      deviceRuntimeDirPath,
      `yarn.lock`,
    ),
    ``,
  );

  const yarnInstallDeviceRuntimeProcess = spawn(
    `yarn set version berry && yarn`,
    {
      shell: true,
      cwd: deviceRuntimeDirPath,
      stdio: `inherit`,
    },
  );

  await new Promise<void>((resolvePromise, rejectPromise) => {

    yarnInstallDeviceRuntimeProcess.on(`exit`, (code) => {

      if (code === 0) {

        resolvePromise();

      } else {

        rejectPromise(new Error());
      }
    });
  });

  generateDeviceRuntimeMainScriptFile();
};
