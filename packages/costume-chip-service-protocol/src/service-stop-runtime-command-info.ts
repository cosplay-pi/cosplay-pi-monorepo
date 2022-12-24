import { ServiceCommandInfo } from "./service-command-info";
import { ServiceCommandType } from "./service-command-type";

export interface ServiceStopRuntimeCommandInfo extends ServiceCommandInfo {
  type: ServiceCommandType.StopRuntime;
};
