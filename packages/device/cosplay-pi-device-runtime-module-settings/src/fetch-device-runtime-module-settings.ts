import * as fs from 'fs';

import { getDeviceRuntimePackageDirPath } from 'costume-chip-device-runtime-module-base';
import { getDeviceRuntimeModuleSettingsFilePath } from 'costume-chip-device-runtime-module-settings-foundation';

import { DeviceRuntimeModuleSettingsDef } from './device-runtime-module-settings-def';

export const fetchDeviceRuntimeModuleSettings = <TDeviceRuntimeModuleSettings>({
  deviceRuntimeModuleSettingsDef,
}: {
  deviceRuntimeModuleSettingsDef: DeviceRuntimeModuleSettingsDef<TDeviceRuntimeModuleSettings>,
}) => {

  const deviceRuntimePackageDirPath = getDeviceRuntimePackageDirPath();

  const deviceRuntimeModuleSettingsFilePath = getDeviceRuntimeModuleSettingsFilePath({
    deviceRuntimeModuleName: deviceRuntimeModuleSettingsDef.name,
    deviceRuntimePackageDirPath,
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
