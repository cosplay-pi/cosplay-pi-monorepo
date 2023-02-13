import { DeviceCommandPayload } from "./device-command-payload";

export type PushDeviceSessionCommand = ({
}: {
  userIdToken: string;
  deviceSessionId: string;
  deviceSessionCommandPayload: DeviceCommandPayload;
}) => Promise<void>;
