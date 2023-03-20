import { DeviceProfile } from "./device-profile";

export type SetUserDeviceProfile = ({
}: {
  userIdToken: string;
  userDeviceId: string;
  userDeviceProfile: DeviceProfile;
}) => Promise<void>;
