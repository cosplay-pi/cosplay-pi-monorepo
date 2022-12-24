import fetch from 'node-fetch';

import { DeviceCommandInfo, DeviceCommandType, DeviceInstallRuntimeCommandInfo, DeviceUpdateModuleSettingsCommandInfo } from 'costume-chip-service-protocol';

import { installRuntimeAsync } from './install-runtime-async';
import { startRuntimeAsync } from './start-runtime-async';
import { stopRuntimeAsync } from './stop-runtime-async';
import { fetchIsExecutingDeviceCommand, setIsExecutingDeviceCommand } from './is-executing-device-command';
import { hubBackendUrl } from './hub-backend-url';
import { fetchCurrentSessionId } from './current-session-id';
import { updateModuleSettingsAsync } from './update-module-settings-async';

export const executeDeviceCommandAsync = async ({
  deviceCommandInfo,
}: {
  deviceCommandInfo: DeviceCommandInfo;
}) => {

  if (fetchIsExecutingDeviceCommand()) {

    throw new Error();
  }

  const hubCurrentSessionId = fetchCurrentSessionId();

  try {

    setIsExecutingDeviceCommand(true);

    try {

      if (deviceCommandInfo.type === DeviceCommandType.InstallRuntime) {

        const serviceInstallRuntimeCommandInfo =
          deviceCommandInfo as DeviceInstallRuntimeCommandInfo;

        await installRuntimeAsync({
          runtimeConfig: serviceInstallRuntimeCommandInfo.runtimeConfig,
        });

      } else if (deviceCommandInfo.type === DeviceCommandType.StartRuntime) {

        await startRuntimeAsync();

      } else if (deviceCommandInfo.type === DeviceCommandType.StopRuntime) {

        await stopRuntimeAsync();

      } else if (deviceCommandInfo.type === DeviceCommandType.UpdateModuleSettings) {

        const serviceUpdateModuleSettingsCommandInfo =
          deviceCommandInfo as DeviceUpdateModuleSettingsCommandInfo;

        await updateModuleSettingsAsync({
          moduleName: serviceUpdateModuleSettingsCommandInfo.moduleName,
          moduleSettings: serviceUpdateModuleSettingsCommandInfo.moduleSettings,
        });
      }

    } finally {

      await fetch(`${hubBackendUrl}/on-command-finished?session_id=${hubCurrentSessionId}&command_id=${deviceCommandInfo.id}`);
    }

  } finally {

    setIsExecutingDeviceCommand(false);
  }
};
