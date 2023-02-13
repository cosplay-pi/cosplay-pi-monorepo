import { spawn } from "child_process";

import { DeviceRuntimeConfig } from "cosplay-pi-hub-backend-protocol";

import { createDeviceRuntimeDir } from "./create-device-runtime-dir";
import { deviceRuntimeDirPath } from "./env";
import { updateDeviceRuntimeConfig } from "./update-device-runtime-config";
import { writeDeviceRuntimeInfoFile } from "./write-device-runtime-info-file";
import { writeDeviceRuntimeMainScriptFile } from "./write-device-runtime-main-script-file";

export const installDeviceRuntime = async ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  createDeviceRuntimeDir();

  writeDeviceRuntimeInfoFile({
    deviceRuntimeConfig,
  });

  const yarnInstallDeviceRuntimeProcess = spawn(
    `yarn`,
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

  writeDeviceRuntimeMainScriptFile({
    deviceRuntimeConfig,
  });

  updateDeviceRuntimeConfig({
    deviceRuntimeConfig,
  });
};
