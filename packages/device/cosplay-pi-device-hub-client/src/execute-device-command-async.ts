import { DeviceCommandInfo, DeviceCommandType } from 'cosplay-pi-device-hub-client-protocol';

import { fetchIsExecutingDeviceCommand, setIsExecutingDeviceCommand } from './is-executing-device-command';
import { installDeviceRuntimeAsync } from './install-device-runtime-async';
import { startDeviceRuntimeAsync } from './start-device-runtime-async';
import { stopDeviceRuntimeAsync } from './stop-device-runtime-async';
import { updateDeviceRuntimeModuleSettingsAsync } from './update-device-runtime-module-settings-async';
import { waitAsync } from './wait_async';

export const executeDeviceCommandAsync = async ({
  deviceCommandInfo,
}: {
  deviceCommandInfo: DeviceCommandInfo;
}) => {

  while (fetchIsExecutingDeviceCommand()) {

    await waitAsync({ milliseconds: 1000 });
  }

  setIsExecutingDeviceCommand(true);

  try {

    if (deviceCommandInfo.payload.type === DeviceCommandType.InstallRuntimeCommand) {

      await installDeviceRuntimeAsync({
        deviceRuntimeConfig: deviceCommandInfo.payload.deviceRuntimeConfig,
      });

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.StartRuntimeCommand) {

      await startDeviceRuntimeAsync();

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.StopRuntimeCommand) {

      await stopDeviceRuntimeAsync();

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.UpdateRuntimeModuleSettingsCommand) {

      await updateDeviceRuntimeModuleSettingsAsync({
        deviceRuntimeModuleName: deviceCommandInfo.payload.deviceRuntimeModuleName,
        deviceRuntimeModuleSettings: deviceCommandInfo.payload.deviceRuntimeModuleSettings,
      });
    }

  } finally {

    setIsExecutingDeviceCommand(false);
  }
};
