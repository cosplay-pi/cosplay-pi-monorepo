import { ModuleState } from "./module-state"

export interface RuntimeState {
  process?: {};
  modules: {
    [moduleName: string]: ModuleState;
  };
};
