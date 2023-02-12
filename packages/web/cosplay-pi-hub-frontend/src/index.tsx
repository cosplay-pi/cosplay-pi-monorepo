import * as FirebaseApp from 'firebase/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { setHubBackendClientConfig } from 'cosplay-pi-hub-backend-client';

import { App } from './app';
import { FirebaseAuthStateProvider } from './contexts/firebase-auth-state-context';
import { ThemeProvider } from './contexts/theme-context';
import {
  hubBackendUrl,
  hubFirebaseApiKey,
  hubFirebaseAppId,
  hubFirebaseAuthDomain,
  hubFirebaseMessagingSenderId,
  hubFirebaseProjectId,
  hubFirebaseStorageBucket,
} from './env';

setHubBackendClientConfig({
  hubBackendUrl,
});

FirebaseApp.initializeApp({
  apiKey: hubFirebaseApiKey,
  authDomain: hubFirebaseAuthDomain,
  projectId: hubFirebaseProjectId,
  storageBucket: hubFirebaseStorageBucket,
  messagingSenderId: hubFirebaseMessagingSenderId,
  appId: hubFirebaseAppId,
});

const root = ReactDOM.createRoot(
  document.getElementById(`root`) as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FirebaseAuthStateProvider>
        <App />
      </FirebaseAuthStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
