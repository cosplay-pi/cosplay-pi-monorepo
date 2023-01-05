import { spawn } from "child_process";

import { DeviceRuntimeConfig } from "cosplay-pi-device-hub-client-protocol";

import { getDeviceServiceArgs } from "./get-device-service-args";
import { createDeviceRuntimePackageDir } from "./create-device-runtime-package-dir";
import { writeDeviceRuntimePackageInfoFile } from "./write-device-runtime-package-info-file";
import { writeDeviceRuntimeMainScriptFile } from "./write-device-runtime-main-script-file";
import { updateDeviceRuntimeConfig } from "./update-device-runtime-config";

export const installDeviceRuntimeAsync = async ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  const deviceServiceArgs = getDeviceServiceArgs();

  createDeviceRuntimePackageDir();

  writeDeviceRuntimePackageInfoFile({
    deviceRuntimeConfig,
  });

  const yarnInstallDeviceRuntimePackageProcess = spawn(
    `yarn`,
    {
      shell: true,
      cwd: deviceServiceArgs.deviceRuntimePackageDirPath,
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
