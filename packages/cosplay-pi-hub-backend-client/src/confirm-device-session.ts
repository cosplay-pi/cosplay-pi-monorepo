import { ConfirmDeviceSession } from "cosplay-pi-hub-backend-protocol";

import { importHubBackendFunc } from "./import-hub-backend-func";

export const confirmDeviceSession =
  importHubBackendFunc<ConfirmDeviceSession>(
    `confirm-device-session`,
  );
