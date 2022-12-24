import { ServiceCommandInfo } from "./service-command-info";
import { ServiceCommandType } from "./service-command-type";

export interface ServiceUpdateModuleSettingsCommandInfo extends ServiceCommandInfo {
  type: ServiceCommandType.UpdateModuleSettings;
  moduleName: string;
  moduleSettings: unknown;
};
