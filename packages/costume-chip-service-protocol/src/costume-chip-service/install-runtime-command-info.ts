import { CommandInfo } from "./command-info";
import { CommandType } from "./command-type";
import { RuntimeConfig } from "./runtime-config";

export interface InstallRuntimeCommandInfo extends CommandInfo {
  type: CommandType.InstallRuntime;
  runtimeConfig: RuntimeConfig;
};
