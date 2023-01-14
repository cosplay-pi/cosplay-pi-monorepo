export const hubBackendPort = parseInt(
  process.env[`COSPLAY_PI_HUB_BACKEND_PORT`] as string,
);

export const hubFirebaseServiceAccountCredentialsFilePath =
  process.env[`COSPLAY_PI_HUB_FIREBASE_SERVICE_ACCOUNT_CREDENTIALS_FILE_PATH`] as string;
