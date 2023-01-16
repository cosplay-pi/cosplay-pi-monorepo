import { DeviceInfo } from "./device-info";

export type FetchUserDevicesInfoAsync = ({
}: {
  userIdToken: string;
}) => Promise<{
  [userDeviceId: string]: DeviceInfo;
}>;
