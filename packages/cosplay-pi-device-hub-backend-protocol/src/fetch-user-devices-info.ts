export type FetchUserDevicesInfo = ({
}: {
  userIdToken: string;
}) => Promise<{
  [userDeviceId: string]: {};
}>;
