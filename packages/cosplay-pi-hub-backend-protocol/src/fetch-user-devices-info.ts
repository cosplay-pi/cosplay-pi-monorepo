import { DeviceInfo } from "./device-info";

export type FetchUserDevicesInfo = ({
}: {
  userIdToken: string;
}) => Promise<{
  [userDeviceId: string]: DeviceInfo;
}>;
