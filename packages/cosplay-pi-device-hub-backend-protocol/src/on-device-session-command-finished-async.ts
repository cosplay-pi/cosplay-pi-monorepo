export type OnDeviceSessionCommandFinishedAsync = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
  deviceSessionCommandId: string;
}) => Promise<void>;
