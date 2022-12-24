import { ServiceCommandInfo } from "./service-command-info";
import { ServiceCommandType } from "./service-command-type";

export interface ServiceStartRuntimeCommandInfo extends ServiceCommandInfo {
  type: ServiceCommandType.StartRuntime;
};
