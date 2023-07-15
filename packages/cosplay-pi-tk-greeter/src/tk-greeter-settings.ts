import {
  DeviceRuntimeModuleSettingsDef,
  fetchDeviceRuntimeModuleEffectiveSettings,
} from 'cosplay-pi-device-runtime-module';

export interface TKGreeterSettings {
  tkid: string;
};

const tkGreeterSettingsDef: DeviceRuntimeModuleSettingsDef<TKGreeterSettings> = {
  name: `cosplay-pi-tk-greeter`,
};

export const tkGreeterEffectiveSettings = fetchDeviceRuntimeModuleEffectiveSettings({
  deviceRuntimeModuleSettingsDef: tkGreeterSettingsDef,
});
