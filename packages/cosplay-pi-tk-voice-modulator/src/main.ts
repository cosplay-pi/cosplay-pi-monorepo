import {
  ChildProcess,
  spawn,
} from 'child_process';

import { tkVoiceModulatorEffectiveSettings } from './tk-voice-modulator-settings';

const init = async () => {

  const recArgs = [
    `--buffer`,
    tkVoiceModulatorEffectiveSettings.bufferSize,
    `-d`,
    `compand`,
    tkVoiceModulatorEffectiveSettings.compand1EffectArgs,
    `bass`,
    tkVoiceModulatorEffectiveSettings.bassEffectArgs,
    `treble`,
    tkVoiceModulatorEffectiveSettings.trebleEffectArgs,
    `overdrive`,
    tkVoiceModulatorEffectiveSettings.overdriveEffectArgs,
    `gain`,
    tkVoiceModulatorEffectiveSettings.gainEffectArgs,
    `highpass`,
    tkVoiceModulatorEffectiveSettings.highpassEffectArgs,
    `lowpass`,
    tkVoiceModulatorEffectiveSettings.lowpassEffectArgs,
    `compand`,
    tkVoiceModulatorEffectiveSettings.compand2EffectArgs,
  ];

  let soxProcess: ChildProcess | undefined;

  const startSoxProcess = () => {

    soxProcess = spawn(
      `nice -n 8 play "|rec ${recArgs.join(` `)}"`,
      {
        shell: true,
        stdio: `inherit`,
      },
    );

    soxProcess.on(
      `exit`,
      async () => {

        await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));

        startSoxProcess();
      },
    );

    soxProcess.on(
      `error`,
      async () => {

        await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));

        startSoxProcess();
      },
    );
  };

  startSoxProcess();
};

init();
