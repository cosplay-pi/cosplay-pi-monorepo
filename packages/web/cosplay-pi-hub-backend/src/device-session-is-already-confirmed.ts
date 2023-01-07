export class DeviceSessionIsAlreadyConfirmed extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionIsAlreadyConfirmed.prototype);
  };
};
