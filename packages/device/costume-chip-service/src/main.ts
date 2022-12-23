import * as CostumeChipService from './costume-chip-service';
import * as CostumeChipModule from './costume-chip-service/__costume-chip-module';

setInterval(() => { }, 1000);

Object.assign(
  globalThis,
  {
    CostumeChipService,
    CostumeChipModule,
  },
);
