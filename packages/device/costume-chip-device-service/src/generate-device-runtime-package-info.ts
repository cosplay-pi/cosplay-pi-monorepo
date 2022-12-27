import { DeviceRuntimeConfig } from "costume-chip-device-service-protocol";

export const generateDeviceRuntimePackageInfo = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  const deviceRuntimePackageInfo = {
    dependencies: {},
  };

  for (const deviceRuntimeModuleName in deviceRuntimeConfig.modules) {

    const deviceRuntimeModuleConfig =
      deviceRuntimeConfig.modules[deviceRuntimeModuleName];

    Object.assign(
      deviceRuntimePackageInfo.dependencies,
      {
        [deviceRuntimeModuleName]: deviceRuntimeModuleConfig.version,
      },
    );
  }

  return deviceRuntimePackageInfo;
};
