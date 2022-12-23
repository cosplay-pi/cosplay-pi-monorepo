import { CommandInfo } from "./command-info";
import { CommandType } from "./command-type";

export interface StopRuntimeCommandInfo extends CommandInfo {
  type: CommandType.StopRuntime;
};
