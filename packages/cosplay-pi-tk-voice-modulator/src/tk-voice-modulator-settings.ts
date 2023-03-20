import {
  DeviceRuntimeModuleSettingsDef,
  fetchDeviceRuntimeModuleEffectiveSettings,
} from 'cosplay-pi-device-runtime-module';

export interface TKVoiceModulatorSettings {
  bufferSize: number;
  compand1EffectArgs: string;
  bassEffectArgs: string;
  trebleEffectArgs: string;
  overdriveEffectArgs: string;
  gainEffectArgs: string;
  highpassEffectArgs: string;
  lowpassEffectArgs: string;
  compand2EffectArgs: string;
};

const tkVoiceModulatorSettingsDef: DeviceRuntimeModuleSettingsDef<TKVoiceModulatorSettings> = {
  name: `cosplay-pi-tk-voice-modulator`,
};

export const tkVoiceModulatorEffectiveSettings = fetchDeviceRuntimeModuleEffectiveSettings({
  deviceRuntimeModuleSettingsDef: tkVoiceModulatorSettingsDef,
});
