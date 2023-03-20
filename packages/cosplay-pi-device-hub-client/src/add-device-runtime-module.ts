import { fetchDeviceRuntimeProcess } from "./device-runtime-process";
import { fetchDeviceRuntimeConfig } from "./fetch-device-runtime-config";
import { installDeviceRuntime } from "./install-device-runtime";
import { setDeviceRuntimeConfig } from "./set-device-runtime-config";

export const addDeviceRuntimeModule = async ({
  deviceRuntimeModuleName,
  deviceRuntimeModuleVersionRange,
}: {
  deviceRuntimeModuleName: string;
  deviceRuntimeModuleVersionRange: string;
}) => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  deviceRuntimeConfig.modules[deviceRuntimeModuleName] = {
    versionRange: deviceRuntimeModuleVersionRange,
  };

  setDeviceRuntimeConfig({
    deviceRuntimeConfig,
  });

  await installDeviceRuntime();
};
