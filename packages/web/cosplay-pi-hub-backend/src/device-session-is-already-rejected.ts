export class DeviceSessionIsAlreadyRejected extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionIsAlreadyRejected.prototype);
  };
};
