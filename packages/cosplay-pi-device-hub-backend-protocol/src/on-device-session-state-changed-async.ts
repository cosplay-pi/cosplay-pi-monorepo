import { DeviceSessionState } from "./device-session-state";

export type OnDeviceSessionStateChangedAsync = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
  deviceSessionState: DeviceSessionState;
}) => Promise<void>;
