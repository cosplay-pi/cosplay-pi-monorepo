import { DeviceCommandType } from "./device-command-type";
import { WifiConnectionConfig } from "./wifi-connection-config";

export interface DeviceRegisterWifiConnectionCommandPayload {
  type: DeviceCommandType.RegisterWifiConnectionCommand;
  wifiConnectionConfig: WifiConnectionConfig;
};
