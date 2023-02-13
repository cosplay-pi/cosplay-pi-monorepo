export type FetchDeviceActiveSessionId = ({
}: {
  userIdToken: string;
  deviceId: string;
}) => Promise<string | undefined>;
