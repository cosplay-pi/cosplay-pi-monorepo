import { DeviceCommandInfo } from "./device-command-info";

export type FetchDeviceSessionNextPendingCommandInfo = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
}) => Promise<DeviceCommandInfo | undefined>;
