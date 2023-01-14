export type ConfirmDeviceSessionAsync = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
}) => Promise<void>;
