export const getEnvVars = () => {

  return {
    hubFirebaseServiceAccountCredentialsFilePath:
      process.env[`COSPLAY_PI_HUB_FIREBASE_SERVICE_ACCOUNT_CREDENTIALS_FILE_PATH`] as string,
  };
};
