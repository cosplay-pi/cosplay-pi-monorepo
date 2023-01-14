export type ConfirmDeviceSession = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
}) => Promise<void>;
