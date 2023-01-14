import { DeviceCommandInfo } from "./device-command-info";

export type FetchDeviceSessionNextPendingCommandInfoAsync = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
}) => Promise<DeviceCommandInfo | undefined>;
