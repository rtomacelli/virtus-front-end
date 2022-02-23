import { Environment } from "./environment";
import { Parameter } from "./parameter";
import { PhoneNumber } from "./phonenumber";

export class Context {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public environmentName?: string,
      public environmentId: number = 0,
      public phoneNumbers?: PhoneNumber[],
      public parameters?: Parameter[],
    ) {  }
  
  }
