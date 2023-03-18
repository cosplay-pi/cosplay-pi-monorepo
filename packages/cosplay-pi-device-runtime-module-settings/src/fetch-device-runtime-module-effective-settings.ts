import { getDeviceRuntimeDirPath } from 'cosplay-pi-device-runtime-self-client';
import {
  fetchDeviceRuntimeModuleOverrideSettings,
  getDeviceRuntimeModuleDefaultSettings,
} from 'cosplay-pi-device-runtime-client';

import { DeviceRuntimeModuleSettingsDef } from './device-runtime-module-settings-def';

export const fetchDeviceRuntimeModuleEffectiveSettings = <TDeviceRuntimeModuleSettings>({
  deviceRuntimeModuleSettingsDef,
}: {
  deviceRuntimeModuleSettingsDef: DeviceRuntimeModuleSettingsDef<TDeviceRuntimeModuleSettings>,
}) => {

  const deviceRuntimeDirPath = getDeviceRuntimeDirPath();

  const deviceRuntimeModuleDefaultSettings = getDeviceRuntimeModuleDefaultSettings({
    deviceRuntimeDirPath,
    deviceRuntimeModuleName: deviceRuntimeModuleSettingsDef.name,
  });

  const deviceRuntimeModuleOverrideSettings = fetchDeviceRuntimeModuleOverrideSettings({
    deviceRuntimeDirPath,
    deviceRuntimeModuleName: deviceRuntimeModuleSettingsDef.name,
  });

  return {
    ...deviceRuntimeModuleDefaultSettings,
    ...deviceRuntimeModuleOverrideSettings,
  } as TDeviceRuntimeModuleSettings;
};
