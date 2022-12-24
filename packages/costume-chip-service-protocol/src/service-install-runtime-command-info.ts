import { ServiceCommandInfo } from "./service-command-info";
import { ServiceCommandType } from "./service-command-type";
import { RuntimeConfig } from "./runtime-config";

export interface ServiceInstallRuntimeCommandInfo extends ServiceCommandInfo {
  type: ServiceCommandType.InstallRuntime;
  runtimeConfig: RuntimeConfig;
};
