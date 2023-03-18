import {
  DeviceCommandInfo,
  DeviceCommandType,
} from 'cosplay-pi-hub-backend-protocol';

import { addDeviceRuntimeModule } from './add-device-runtime-module';
import {
  fetchExecuteDeviceCommandTaskState,
  setExecuteDeviceCommandTaskState,
} from './execute-device-command-task-state';
import { removeDeviceRuntimeModule } from './remove-device-runtime-module';
import { setDeviceRuntimeModuleOverrideSettings } from './set-device-runtime-module-override-settings';
import { startDeviceRuntime } from './start-device-runtime';
import { stopDeviceRuntime } from './stop-device-runtime';
import { wait } from './wait';

export const executeDeviceCommand = async ({
  deviceCommandInfo,
}: {
  deviceCommandInfo: DeviceCommandInfo;
}) => {

  while (fetchExecuteDeviceCommandTaskState() !== undefined) {

    await wait({ milliseconds: 1000 });
  }

  setExecuteDeviceCommandTaskState({});

  try {

    if (deviceCommandInfo.payload.type === DeviceCommandType.AddRuntimeModuleCommand) {

      await addDeviceRuntimeModule({
        deviceRuntimeModuleName: deviceCommandInfo.payload.deviceRuntimeModuleName,
      });

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.RemoveRuntimeModuleCommand) {

      await removeDeviceRuntimeModule({
        deviceRuntimeModuleName: deviceCommandInfo.payload.deviceRuntimeModuleName,
      });

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.SetRuntimeModuleOverrideSettings) {

      await setDeviceRuntimeModuleOverrideSettings({
        deviceRuntimeModuleName: deviceCommandInfo.payload.deviceRuntimeModuleName,
        deviceRuntimeModuleOverrideSettings: deviceCommandInfo.payload.deviceRuntimeModuleOverrideSettings,
      });

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.StartRuntimeCommand) {

      await startDeviceRuntime();

    } else if (deviceCommandInfo.payload.type === DeviceCommandType.StopRuntimeCommand) {

      await stopDeviceRuntime();
    }

  } finally {

    setExecuteDeviceCommandTaskState(undefined);
  }
};
