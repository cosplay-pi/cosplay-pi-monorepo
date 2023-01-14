export type FetchDeviceActiveSessionIdAsync = ({
}: {
  userIdToken: string;
  deviceId: string;
}) => Promise<string | undefined>;
