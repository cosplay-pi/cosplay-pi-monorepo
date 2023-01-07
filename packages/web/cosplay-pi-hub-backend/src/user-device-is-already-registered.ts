export class UserDeviceIsAlreadyRegistered extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, UserDeviceIsAlreadyRegistered.prototype);
  };
};
