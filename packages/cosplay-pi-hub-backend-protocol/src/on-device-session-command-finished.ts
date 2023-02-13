export type OnDeviceSessionCommandFinished = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
  deviceSessionCommandId: string;
}) => Promise<void>;
