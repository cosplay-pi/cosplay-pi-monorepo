import { exec } from 'child_process';
import * as path from 'path';

import { tkGreeterEffectiveSettings } from './tk-greeter-settings';

const init = async () => {

  const getLetterSoundFileName = (letter: string) => {

    switch (letter.toLowerCase()) {
      case `0`: return `0.mp3`;
      case `1`: return `1.mp3`;
      case `2`: return `2.mp3`;
      case `3`: return `3.mp3`;
      case `4`: return `4.mp3`;
      case `5`: return `5.mp3`;
      case `6`: return `6.mp3`;
      case `7`: return `7.mp3`;
      case `8`: return `8.mp3`;
      case `9`: return `9.mp3`;
      case `t`: return `t.mp3`;
      case `d`: return `d.mp3`;
    }

    return undefined;
  };

  const playSound = (soundFileName: string) => {

    const soundFilePath = path.resolve(
      __dirname,
      `..`,
      `res`,
      soundFileName,
    );

    exec(`play ${soundFilePath}`);
  };

  const wait = async (ms: number) => {

    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  playSound(`welcome-back.mp3`);

  await wait(1200);

  for (let i = 0; i < tkGreeterEffectiveSettings.tkid.length; i++) {

    const letter = tkGreeterEffectiveSettings.tkid.charAt(i);

    const letterSoundFileName = getLetterSoundFileName(letter);

    if (letterSoundFileName !== undefined) {

      playSound(letterSoundFileName);
    }

    await wait(600);
  }

  await wait(600);

  playSound(`for-the-empire.mp3`);
};

init();
