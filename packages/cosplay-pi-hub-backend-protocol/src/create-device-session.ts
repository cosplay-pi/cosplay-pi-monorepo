export type CreateDeviceSession = ({
}: {
  deviceId: string;
  deviceSessionEncryptedNonce: string;
}) => Promise<{
  deviceSessionId: string;
  deviceSessionAccessToken: string;
  deviceSessionNonce: string;
}>;
