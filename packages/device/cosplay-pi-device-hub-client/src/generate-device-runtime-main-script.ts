import { DeviceRuntimeConfig } from "cosplay-pi-device-hub-backend-protocol";

export const generateDeviceRuntimeMainScript = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  let deviceRuntimeMainScript = `setInterval(() => console.log('Hi'), 1000);\n`;

  for (const deviceRuntimeModuleName in deviceRuntimeConfig.modules) {

    deviceRuntimeMainScript += `require('${deviceRuntimeModuleName}');\n`;
  }

  return deviceRuntimeMainScript;
};
