import { DeviceSessionState } from "./device-session-state";

export type FetchDeviceSessionState = ({
}: {
  userIdToken: string;
  deviceSessionId: string;
}) => Promise<DeviceSessionState>;
