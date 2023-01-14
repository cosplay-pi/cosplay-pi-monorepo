import { DeviceSessionState } from "./device-session-state";

export type FetchDeviceSessionStateAsync = ({
}: {
  userIdToken: string;
  deviceSessionId: string;
}) => Promise<DeviceSessionState>;
