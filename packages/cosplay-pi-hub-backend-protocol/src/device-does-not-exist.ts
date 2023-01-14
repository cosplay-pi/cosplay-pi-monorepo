export class DeviceDoesNotExist extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceDoesNotExist.prototype);
  };
};
