import { DeviceDoesNotExist } from "./device-does-not-exist";
import { DeviceSessionAccessTokenIsNotValid } from "./device-session-access-token-is-not-valid";
import { DeviceSessionCommandDoesNotExist } from "./device-session-command-does-not-exist";
import { DeviceSessionCommandIsAlreadyFinished } from "./device-session-command-is-already-finished";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsAlreadyConfirmed } from "./device-session-is-already-confirmed";
import { DeviceSessionIsAlreadyRejected } from "./device-session-is-already-rejected";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
import { UserDeviceIsAlreadyRegistered } from "./user-device-is-already-registered";
import { UserDevicePrivateKeyIsNotValid } from "./user-device-private-key-is-not-valid";
import { UserIdTokenIsNotValid } from "./user-id-token-is-not-valid";

export const hubBackendFuncErrorTypes = {
  DeviceDoesNotExist,
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionCommandDoesNotExist,
  DeviceSessionCommandIsAlreadyFinished,
  DeviceSessionDoesNotExist,
  DeviceSessionIsAlreadyConfirmed,
  DeviceSessionIsAlreadyRejected,
  DeviceSessionIsNotConfirmed,
  UserDeviceIsAlreadyRegistered,
  UserDevicePrivateKeyIsNotValid,
  UserIdTokenIsNotValid,
};
