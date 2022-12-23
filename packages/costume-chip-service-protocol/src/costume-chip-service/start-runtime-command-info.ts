import { CommandInfo } from "./command-info";
import { CommandType } from "./command-type";

export interface StartRuntimeCommandInfo extends CommandInfo {
  type: CommandType.StartRuntime;
};
