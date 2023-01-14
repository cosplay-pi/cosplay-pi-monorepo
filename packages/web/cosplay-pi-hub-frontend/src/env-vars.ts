export const envVars = {
  hubBackendUrl:
    process.env[`REACT_APP_COSPLAY_PI_HUB_BACKEND_URL`] as string,
  hubFirebaseApiKey:
    process.env[`REACT_APP_COSPLAY_PI_HUB_FIREBASE_API_KEY`] as string,
  hubFirebaseAuthDomain:
    process.env[`REACT_APP_COSPLAY_PI_HUB_FIREBASE_AUTH_DOMAIN`] as string,
  hubFirebaseProjectId:
    process.env[`REACT_APP_COSPLAY_PI_HUB_FIREBASE_PROJECT_ID`] as string,
  hubFirebaseStorageBucket:
    process.env[`REACT_APP_COSPLAY_PI_HUB_FIREBASE_STORAGE_BUCKET`] as string,
  hubFirebaseMessagingSenderId:
    process.env[`REACT_APP_COSPLAY_PI_HUB_FIREBASE_MESSAGING_SENDER_ID`] as string,
  hubFirebaseAppId:
    process.env[`REACT_APP_COSPLAY_PI_HUB_FIREBASE_APP_ID`] as string,
};
