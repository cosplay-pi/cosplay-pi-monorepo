import { DeviceSessionState } from "./device-session-state";

export type OnDeviceSessionStateChanged = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
  deviceSessionState: DeviceSessionState;
}) => Promise<void>;
