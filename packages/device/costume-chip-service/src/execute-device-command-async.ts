import fetch from 'node-fetch';

import { DeviceCommandInfo, DeviceCommandType, DeviceInstallRuntimeCommandInfo, DeviceUpdateRuntimeModuleSettingsCommandInfo } from 'costume-chip-service-protocol';

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

      if (deviceCommandInfo.type === DeviceCommandType.InstallRuntimeCommand) {

        const deviceInstallRuntimeCommandInfo =
          deviceCommandInfo as DeviceInstallRuntimeCommandInfo;

        await installDeviceRuntimeAsync({
          deviceRuntimeConfig: deviceInstallRuntimeCommandInfo.deviceRuntimeConfig,
        });

      } else if (deviceCommandInfo.type === DeviceCommandType.StartRuntimeCommand) {

        await startDeviceRuntimeAsync();

      } else if (deviceCommandInfo.type === DeviceCommandType.StopRuntimeCommand) {

        await stopDeviceRuntimeAsync();

      } else if (deviceCommandInfo.type === DeviceCommandType.UpdateRuntimeModuleSettingsCommand) {

        const deviceUpdateRuntimeModuleSettingsCommandInfo =
          deviceCommandInfo as DeviceUpdateRuntimeModuleSettingsCommandInfo;

        await updateDeviceRuntimeModuleSettingsAsync({
          deviceRuntimeModuleName: deviceUpdateRuntimeModuleSettingsCommandInfo.deviceRuntimeModuleName,
          deviceRuntimeModuleSettings: deviceUpdateRuntimeModuleSettingsCommandInfo.deviceRuntimeModuleSettings,
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
