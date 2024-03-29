import { DeviceRuntimeState } from "./device-runtime-state";

export type ConfirmDeviceSession = ({
}: {
  deviceSessionId: string;
  deviceSessionAccessToken: string;
  deviceRuntimeState: DeviceRuntimeState;
}) => Promise<void>;
