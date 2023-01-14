export class DeviceSessionIsNotConfirmed extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionIsNotConfirmed.prototype);
  };
};
