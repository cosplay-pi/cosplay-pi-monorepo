import {
  DeviceCommandInfo,
  DeviceCommandType,
} from 'cosplay-pi-hub-backend-protocol';

import { installDeviceRuntime } from './install-device-runtime';
import {
  fetchIsExecutingDeviceCommand,
  setIsExecutingDeviceCommand,
} from './is-executing-device-command';
import { startDeviceRuntime } from './start-device-runtime';
import { stopDeviceRuntime } from './stop-device-runtime';
import { updateDeviceRuntimeModuleSettings } from './update-device-runtime-module-settings';
import { wait } from './wait';

export const executeDeviceCommand = async ({
  deviceCommandInfo,
}: {
  deviceCommandInfo: DeviceCommandInfo;
}) => {

  while (fetchIsExecutingDeviceCommand()) {

    await wait({ milliseconds: 1000 });
  }

  setIsExecutingDeviceCommand(true);

  try {

    if (deviceCommandInfo.payload.type === DeviceCommandType.InstallRuntimeCommand) {

      await installDeviceRuntime({
        deviceRuntimeConfig: deviceCommandInfo.payload.deviceRuntimeConfig,
      });

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.StartRuntimeCommand) {

      await startDeviceRuntime();

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.StopRuntimeCommand) {

      await stopDeviceRuntime();

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.UpdateRuntimeModuleSettingsCommand) {

      await updateDeviceRuntimeModuleSettings({
        deviceRuntimeModuleName: deviceCommandInfo.payload.deviceRuntimeModuleName,
        deviceRuntimeModuleSettings: deviceCommandInfo.payload.deviceRuntimeModuleSettings,
      });
    }

  } finally {

    setIsExecutingDeviceCommand(false);
  }
};
