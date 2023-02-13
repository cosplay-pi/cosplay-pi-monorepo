import {
  ConfirmDeviceSession,
  CreateDeviceSession,
  FetchDeviceActiveSessionId,
  FetchDeviceSessionNextPendingCommandInfo,
  FetchDeviceSessionState,
  FetchUserDevicesInfo,
  OnDeviceSessionCommandFinished,
  OnDeviceSessionStateChanged,
  PushDeviceSessionCommand,
  RegisterUserDevice,
  RejectDeviceSession,
} from 'cosplay-pi-hub-backend-protocol';

import { importHubBackendFunc } from './import-hub-backend-func';

export * from './hub-backend-client-is-not-configured';
export * from './hub-backend-client-config';

export const confirmDeviceSession =
  importHubBackendFunc<ConfirmDeviceSession>(
    `confirm-device-session`,
  );

export const createDeviceSession =
  importHubBackendFunc<CreateDeviceSession>(
    `create-device-session`,
  );

export const fetchDeviceActiveSessionId =
  importHubBackendFunc<FetchDeviceActiveSessionId>(
    `fetch-device-active-session-id`,
  );

export const fetchDeviceSessionNextPendingCommandInfo =
  importHubBackendFunc<FetchDeviceSessionNextPendingCommandInfo>(
    `fetch-device-session-next-pending-command-info`,
  );

export const fetchDeviceSessionState =
  importHubBackendFunc<FetchDeviceSessionState>(
    `fetch-device-session-state`,
  );

export const fetchUserDevicesInfo =
  importHubBackendFunc<FetchUserDevicesInfo>(
    `fetch-user-devices-info`,
  );

export const onDeviceSessionCommandFinished =
  importHubBackendFunc<OnDeviceSessionCommandFinished>(
    `on-device-session-command-finished`,
  );

export const onDeviceSessionStateChanged =
  importHubBackendFunc<OnDeviceSessionStateChanged>(
    `on-device-session-state-changed`,
  );

export const pushDeviceSessionCommand =
  importHubBackendFunc<PushDeviceSessionCommand>(
    `push-device-session-command`,
  );

export const registerUserDevice =
  importHubBackendFunc<RegisterUserDevice>(
    `register-user-device`,
  );

export const rejectDeviceSession =
  importHubBackendFunc<RejectDeviceSession>(
    `reject-device-session`,
  );
