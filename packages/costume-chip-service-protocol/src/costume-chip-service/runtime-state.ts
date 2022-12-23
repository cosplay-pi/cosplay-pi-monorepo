import { RuntimeModuleState } from "./runtime-module-state"

export interface RuntimeState {
  process?: {};
  modules: {
    [moduleName: string]: RuntimeModuleState;
  };
};
