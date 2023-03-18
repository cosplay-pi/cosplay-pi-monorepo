import { fetchDeviceRuntimeModuleEffectiveSettings } from 'cosplay-pi-device-runtime-module-settings';

import { exampleModuleSettingsDef } from './example-module-settings-def';

export const printMessage = () => {

  const exampleModuleSettings = fetchDeviceRuntimeModuleEffectiveSettings({
    deviceRuntimeModuleSettingsDef: exampleModuleSettingsDef,
  });

  console.log(exampleModuleSettings.message);
};
