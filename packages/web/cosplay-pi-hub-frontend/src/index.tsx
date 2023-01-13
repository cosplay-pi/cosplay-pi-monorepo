import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from '@chakra-ui/react';
import * as FirebaseApp from 'firebase/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app';
import { envVars } from './env-vars';

FirebaseApp.initializeApp({
  apiKey: envVars.hubFirebaseApiKey,
  authDomain: envVars.hubFirebaseAuthDomain,
  projectId: envVars.hubFirebaseProjectId,
  storageBucket: envVars.hubFirebaseStorageBucket,
  messagingSenderId: envVars.hubFirebaseMessagingSenderId,
  appId: envVars.hubFirebaseAppId,
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
