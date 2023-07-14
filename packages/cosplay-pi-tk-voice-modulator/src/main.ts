import {
  ChildProcessWithoutNullStreams,
  spawn,
} from 'child_process';

import { tkVoiceModulatorEffectiveSettings } from './tk-voice-modulator-settings';

const init = async () => {

  console.log(`This module uses these sounds from freesound:`);
  console.log(`- "radio click 7.wav" by ERH ( https://freesound.org/people/ERH/sounds/30331/ ) licensed under CCBY 4.0`);

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

  const startSox = () => {

    let soxInputProcess: ChildProcessWithoutNullStreams | undefined = spawn(
      `nice -n 8 sox -d -t wav - ${recArgs.join(` `)}`,
      {
        shell: true,
      },
    );

    let soxOutputProcess: ChildProcessWithoutNullStreams | undefined = spawn(
      `play -t wav -`,
      {
        shell: true,
      },
    );

    soxInputProcess.stdout.pipe(soxOutputProcess.stdin);
    soxInputProcess.stderr.on(`data`, () => {
    });

    soxOutputProcess.stdout.pipe(process.stdout);
    soxOutputProcess.stderr.on(`data`, () => {
    });

    const onSoxTerminated = async () => {

      await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));

      if (soxInputProcess !== undefined) {

        try {

          soxInputProcess.kill();

        } catch {
        } finally {

          soxInputProcess = undefined;
        }
      }

      if (soxOutputProcess !== undefined) {

        try {

          soxOutputProcess.kill();

        } catch {
        } finally {

          soxOutputProcess = undefined;
        }
      }

      startSox();
    };

    soxInputProcess.on(
      `exit`,
      onSoxTerminated,
    );

    soxInputProcess.on(
      `error`,
      onSoxTerminated,
    );

    soxOutputProcess.on(
      `exit`,
      onSoxTerminated,
    );

    soxOutputProcess.on(
      `error`,
      onSoxTerminated,
    );
  };

  startSox();
};

init();
