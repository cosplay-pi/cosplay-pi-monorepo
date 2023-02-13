import { spawn } from "child_process";

import { DeviceRuntimeConfig } from "cosplay-pi-hub-backend-protocol";

import { createDeviceRuntimePackageDir } from "./create-device-runtime-package-dir";
import { deviceRuntimeDirPath } from "./env";
import { updateDeviceRuntimeConfig } from "./update-device-runtime-config";
import { writeDeviceRuntimeMainScriptFile } from "./write-device-runtime-main-script-file";
import { writeDeviceRuntimePackageInfoFile } from "./write-device-runtime-package-info-file";

export const installDeviceRuntime = async ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  createDeviceRuntimePackageDir();

  writeDeviceRuntimePackageInfoFile({
    deviceRuntimeConfig,
  });

  const yarnInstallDeviceRuntimePackageProcess = spawn(
    `yarn`,
    {
      shell: true,
      cwd: deviceRuntimeDirPath,
      stdio: `inherit`,
    },
  );

  await new Promise<void>((resolvePromise, rejectPromise) => {

    yarnInstallDeviceRuntimePackageProcess.on(`exit`, (code) => {

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
