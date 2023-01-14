export class DeviceSessionCommandIsAlreadyFinished extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionCommandIsAlreadyFinished.prototype);
  };
};
