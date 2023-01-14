import { DeviceCommandPayload } from "./device-command-payload";

export type PushDeviceSessionCommandAsync = ({
}: {
  userIdToken: string;
  deviceSessionId: string;
  deviceSessionCommandPayload: DeviceCommandPayload;
}) => Promise<void>;
