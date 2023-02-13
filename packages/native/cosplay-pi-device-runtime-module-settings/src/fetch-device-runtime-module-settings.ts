import * as fs from 'fs';

import { getDeviceRuntimeDirPath } from 'cosplay-pi-device-runtime-module-base';
import { getDeviceRuntimeModuleSettingsFilePath } from 'cosplay-pi-device-runtime-module-settings-foundation';

import { DeviceRuntimeModuleSettingsDef } from './device-runtime-module-settings-def';

export const fetchDeviceRuntimeModuleSettings = <TDeviceRuntimeModuleSettings>({
  deviceRuntimeModuleSettingsDef,
}: {
  deviceRuntimeModuleSettingsDef: DeviceRuntimeModuleSettingsDef<TDeviceRuntimeModuleSettings>,
}) => {

  const deviceRuntimeDirPath = getDeviceRuntimeDirPath();

  const deviceRuntimeModuleSettingsFilePath = getDeviceRuntimeModuleSettingsFilePath({
    deviceRuntimeModuleName: deviceRuntimeModuleSettingsDef.name,
    deviceRuntimeDirPath,
  });

  if (!fs.existsSync(deviceRuntimeModuleSettingsFilePath)) {

    return deviceRuntimeModuleSettingsDef.defaultSettings;
  }

  const deviceRuntimeModuleSettings = JSON.parse(
    fs.readFileSync(
      deviceRuntimeModuleSettingsFilePath,
      `utf8`,
    ),
  ) as TDeviceRuntimeModuleSettings;

  return deviceRuntimeModuleSettings;
};
