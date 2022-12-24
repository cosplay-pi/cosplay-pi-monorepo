export * from './print-message';
export * from './example-module-settings';
export * from './example-module-settings-def';

import { printMessage } from './print-message';

setInterval(
  () => {

    printMessage();
  },
  1000,
);
