import { DeviceInfo } from "./device-info";

export type FetchDeviceInfo = ({
}: {
  userIdToken: string;
  deviceId: string;
}) => Promise<DeviceInfo>;
