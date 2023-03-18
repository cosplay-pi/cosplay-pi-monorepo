import {
  fetchDeviceRuntimeModuleOverrideSettings,
  fetchIsDeviceModuleInstalled,
  getDeviceRuntimeModuleDefaultSettings,
} from 'cosplay-pi-device-runtime-module-settings-foundation';
import { DeviceRuntimeState } from 'cosplay-pi-hub-backend-protocol';

import { fetchDeviceRuntimeInstallTaskState } from './device-runtime-install-task-state';
import { fetchDeviceRuntimeProcess } from './device-runtime-process';
import { deviceRuntimeDirPath } from './env';
import { fetchDeviceRuntimeConfig } from './fetch-device-runtime-config';

export const fetchDeviceRuntimeState = (): DeviceRuntimeState => {

  const deviceRuntimeConfig = fetchDeviceRuntimeConfig();

  const deviceRuntimeInstallTaskState = fetchDeviceRuntimeInstallTaskState();

  const deviceRuntimeModulesState: DeviceRuntimeState[`modules`] = {};

  for (const deviceRuntimeModuleName of Object.keys(deviceRuntimeConfig.modules)) {

    const isDeviceRuntimeModuleInstalled = fetchIsDeviceModuleInstalled({
      deviceRuntimeDirPath,
      deviceRuntimeModuleName,
    });

    if (!isDeviceRuntimeModuleInstalled) {

      continue;
    }

    deviceRuntimeModulesState[deviceRuntimeModuleName] = {
      defaultSettings: getDeviceRuntimeModuleDefaultSettings({
        deviceRuntimeDirPath,
        deviceRuntimeModuleName,
      }),
      overrideSettings: fetchDeviceRuntimeModuleOverrideSettings({
        deviceRuntimeDirPath,
        deviceRuntimeModuleName,
      }),
    };
  }

  const deviceRuntimeProcess = fetchDeviceRuntimeProcess();

  return {
    installTask: deviceRuntimeInstallTaskState,
    modules: deviceRuntimeModulesState,
    process: deviceRuntimeProcess === undefined
      ? undefined
      : {},
  };
};
