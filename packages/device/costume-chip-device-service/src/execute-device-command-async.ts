import fetch from 'node-fetch';

import { DeviceCommandInfo, DeviceCommandType } from 'costume-chip-device-service-protocol';

import { fetchIsExecutingDeviceCommand, setIsExecutingDeviceCommand } from './is-executing-device-command';
import { fetchDeviceSessionId } from './device-session-id';
import { installDeviceRuntimeAsync } from './install-device-runtime-async';
import { startDeviceRuntimeAsync } from './start-device-runtime-async';
import { stopDeviceRuntimeAsync } from './stop-device-runtime-async';
import { updateDeviceRuntimeModuleSettingsAsync } from './update-device-runtime-module-settings-async';
import { getHubBackendUrl } from './get-hub-backend-url';

export const executeDeviceCommandAsync = async ({
  deviceCommandInfo,
}: {
  deviceCommandInfo: DeviceCommandInfo;
}) => {

  if (fetchIsExecutingDeviceCommand()) {

    throw new Error();
  }

  try {

    setIsExecutingDeviceCommand(true);

    const deviceSessionId = fetchDeviceSessionId();

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

      const hubBackendUrl = getHubBackendUrl();

      await fetch(`${hubBackendUrl}/on-device-command-finished?session_id=${deviceSessionId}&device_command_id=${deviceCommandInfo.id}`);
    }

  } finally {

    setIsExecutingDeviceCommand(false);
  }
};
