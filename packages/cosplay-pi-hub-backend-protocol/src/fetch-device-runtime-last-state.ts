import { DeviceRuntimeState } from "./device-runtime-state";

export type FetchDeviceRuntimeLastState = ({
}: {
  userIdToken: string;
  deviceId: string;
}) => Promise<DeviceRuntimeState>;
