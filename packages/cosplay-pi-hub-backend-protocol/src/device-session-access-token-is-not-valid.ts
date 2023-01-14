export class DeviceSessionAccessTokenIsNotValid extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, DeviceSessionAccessTokenIsNotValid.prototype);
  };
};
