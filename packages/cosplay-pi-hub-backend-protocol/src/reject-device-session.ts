export type RejectDeviceSession = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
}) => Promise<void>;
