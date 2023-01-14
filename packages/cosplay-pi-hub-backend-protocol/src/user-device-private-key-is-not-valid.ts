export class UserDevicePrivateKeyIsNotValid extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, UserDevicePrivateKeyIsNotValid.prototype);
  };
};
