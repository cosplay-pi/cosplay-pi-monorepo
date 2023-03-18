import { fetchDeviceRuntimeProcess } from "./device-runtime-process";
import { fetchDeviceRuntimeConfig } from "./fetch-device-runtime-config";
import { installDeviceRuntime } from "./install-device-runtime";
import { setDeviceRuntimeConfig } from "./set-device-runtime-config";

export const removeDeviceRuntimeModule = async ({
  deviceRuntimeModuleName,
}: {
  deviceRuntimeModuleName: string;
}) => {

  if (fetchDeviceRuntimeProcess() !== undefined) {

    throw new Error();
  }

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  delete deviceRuntimeConfig.modules[deviceRuntimeModuleName];

  setDeviceRuntimeConfig({
    deviceRuntimeConfig,
  });

  await installDeviceRuntime();
};
