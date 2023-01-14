export class DeviceSessionCommandDoesNotExist extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionCommandDoesNotExist.prototype);
  };
};
