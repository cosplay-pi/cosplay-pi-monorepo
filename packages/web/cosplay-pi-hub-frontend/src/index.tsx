import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from '@chakra-ui/react';
import * as FirebaseApp from 'firebase/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { setHubBackendClientConfig } from 'cosplay-pi-hub-backend-client';

import { App } from './app';
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

const theme = extendTheme({
  config: {
    initialColorMode: `dark`,
    useSystemColorMode: false,
  },
});

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
