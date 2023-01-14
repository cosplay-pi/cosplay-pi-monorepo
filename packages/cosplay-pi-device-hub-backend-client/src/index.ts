import {
  ConfirmDeviceSessionAsync,
  CreateDeviceSessionAsync,
  FetchDeviceActiveSessionIdAsync,
  FetchDeviceSessionNextPendingCommandInfoAsync,
  FetchDeviceSessionStateAsync,
  FetchUserDevicesInfoAsync,
  OnDeviceSessionCommandFinishedAsync,
  OnDeviceSessionStateChangedAsync,
  PushDeviceSessionCommandAsync,
  RegisterUserDeviceAsync,
  RejectDeviceSessionAsync,
} from 'cosplay-pi-device-hub-backend-protocol';

import { $importHubBackendAsyncFunc } from './$import-hub-backend-async-func';

export * from './hub-backend-client-is-not-configured';
export * from './hub-backend-client-config';

export const confirmDeviceSessionAsync =
  $importHubBackendAsyncFunc<ConfirmDeviceSessionAsync>(
    `confirm-device-session`,
  );

export const createDeviceSessionAsync =
  $importHubBackendAsyncFunc<CreateDeviceSessionAsync>(
    `create-device-session`,
  );

export const fetchDeviceActiveSessionIdAsync =
  $importHubBackendAsyncFunc<FetchDeviceActiveSessionIdAsync>(
    `fetch-device-active-session-id`,
  );

export const fetchDeviceSessionNextPendingCommandInfoAsync =
  $importHubBackendAsyncFunc<FetchDeviceSessionNextPendingCommandInfoAsync>(
    `fetch-device-session-next-pending-command-info`,
  );

export const fetchDeviceSessionStateAsync =
  $importHubBackendAsyncFunc<FetchDeviceSessionStateAsync>(
    `fetch-device-session-state`,
  );

export const fetchUserDevicesInfoAsync =
  $importHubBackendAsyncFunc<FetchUserDevicesInfoAsync>(
    `fetch-user-devices-info`,
  );

export const onDeviceSessionCommandFinishedAsync =
  $importHubBackendAsyncFunc<OnDeviceSessionCommandFinishedAsync>(
    `on-device-session-command-finished`,
  );

export const onDeviceSessionStateChangedAsync =
  $importHubBackendAsyncFunc<OnDeviceSessionStateChangedAsync>(
    `on-device-session-state-changed`,
  );

export const pushDeviceSessionCommandAsync =
  $importHubBackendAsyncFunc<PushDeviceSessionCommandAsync>(
    `push-device-session-command`,
  );

export const registerUserDeviceAsync =
  $importHubBackendAsyncFunc<RegisterUserDeviceAsync>(
    `register-user-device`,
  );

export const rejectDeviceSessionAsync =
  $importHubBackendAsyncFunc<RejectDeviceSessionAsync>(
    `reject-device-session`,
  );
