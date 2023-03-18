import { DeviceRuntimeState } from "./device-runtime-state";

export type OnDeviceRuntimeStateChanged = ({
}: {
  deviceId: string;
  deviceActiveSessionAccessToken: string;
  deviceRuntimeState: DeviceRuntimeState;
}) => Promise<void>;
