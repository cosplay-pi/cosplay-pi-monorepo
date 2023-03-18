import { DeviceRuntimeModuleState } from "./device-runtime-module-state";

export interface DeviceRuntimeState {
  installTask?: {};
  modules: {
    [moduleName: string]: DeviceRuntimeModuleState;
  };
  process?: {};
};
