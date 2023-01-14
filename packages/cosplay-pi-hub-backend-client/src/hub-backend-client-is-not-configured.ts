export class HubBackendClientIsNotConfigured extends Error {

  constructor() {

    super();

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, HubBackendClientIsNotConfigured.prototype);
  };
};
