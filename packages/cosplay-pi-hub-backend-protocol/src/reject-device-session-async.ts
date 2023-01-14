export type RejectDeviceSessionAsync = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
}) => Promise<void>;
