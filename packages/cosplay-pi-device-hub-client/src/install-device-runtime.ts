import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

import { createDeviceRuntimeDir } from "./create-device-runtime-dir";
import { fetchDeviceRuntimeProcess } from "./device-runtime-process";
import { deviceRuntimeDirPath } from "./env";
import { fetchDeviceRuntimeConfig } from "./fetch-device-runtime-config";
import { generateDeviceRuntimeInfoFile } from "./generate-device-runtime-info-file";
import { generateDeviceRuntimeMainScriptFile } from "./generate-device-runtime-main-script-file";
import { setDeviceRuntimeLastConfig } from "./set-device-runtime-last-config";

export const installDeviceRuntime = async () => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  createDeviceRuntimeDir();

  generateDeviceRuntimeInfoFile();

  fs.writeFileSync(
    path.resolve(
      deviceRuntimeDirPath,
      `package-lock.json`,
    ),
    ``,
  );

  const npmInstallDeviceRuntimeProcess = spawn(
    `npm install`,
    {
      shell: true,
      cwd: deviceRuntimeDirPath,
      stdio: `inherit`,
    },
  );

  await new Promise<void>((resolvePromise, rejectPromise) => {

    npmInstallDeviceRuntimeProcess.on(`exit`, (code) => {

      if (code === 0) {

        resolvePromise();

      } else {

        rejectPromise(new Error());
      }
    });
  });

  setDeviceRuntimeLastConfig({
    deviceRuntimeLastConfig: deviceRuntimeConfig,
  });

  generateDeviceRuntimeMainScriptFile();
};
