import { DeviceRuntimeConfig } from "cosplay-pi-hub-backend-protocol";

export const generateDeviceRuntimeInfo = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  const deviceRuntimeInfo = {
    dependencies: {},
  };

  for (const deviceRuntimeModuleName in deviceRuntimeConfig.modules) {

    const deviceRuntimeModuleConfig =
      deviceRuntimeConfig.modules[deviceRuntimeModuleName];

    Object.assign(
      deviceRuntimeInfo.dependencies,
      {
        [deviceRuntimeModuleName]: deviceRuntimeModuleConfig.version,
      },
    );
  }

  return deviceRuntimeInfo;
};
