import { Environment } from "./environment";

export class PhoneNumber {
  public id: number = 0
    constructor(
      public phoneNumber: string,
      public description?: string,
      public alias?: string,
      public sid?: string,
      public environmentId?: number,
      public environmentName?: string,
      public contextId?: number,
      public contextName?: string,
      public position?: string,
    ) {  }
  
  }
