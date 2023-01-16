import { DeviceProfile } from "./device-profile";

export type RegisterUserDeviceAsync = ({
}: {
  userIdToken: string;
  userDeviceProfile: DeviceProfile;
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
