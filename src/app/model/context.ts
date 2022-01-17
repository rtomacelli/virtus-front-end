import { Environment } from "./environment";

export class Context {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public environmentName?: string,
      public environmentId: number = 0,
    ) {  }
  
  }
