export class UserIdTokenIsNotValid extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, UserIdTokenIsNotValid.prototype);
  };
};
