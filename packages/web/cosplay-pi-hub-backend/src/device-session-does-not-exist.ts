export class DeviceSessionDoesNotExist extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionDoesNotExist.prototype);
  };
};
