export type RegisterUserDeviceAsync = ({
}: {
  userIdToken: string;
  userDevicePrivateKeyKty: string;
  userDevicePrivateKeyN: string;
  userDevicePrivateKeyE: string;
  userDevicePrivateKeyD: string;
  userDevicePrivateKeyP: string;
  userDevicePrivateKeyQ: string;
  userDevicePrivateKeyDp: string;
  userDevicePrivateKeyDq: string;
  userDevicePrivateKeyQi: string;
}) => Promise<{ userDeviceId: string; }>;
