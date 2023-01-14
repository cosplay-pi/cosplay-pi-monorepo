export type FetchUserDevicesInfoAsync = ({
}: {
  userIdToken: string;
}) => Promise<{
  [userDeviceId: string]: {};
}>;
