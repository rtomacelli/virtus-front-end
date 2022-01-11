import { Environment } from "./environment";

export class Context {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public environmentId: number = 0,
      public environment?: Environment,
    ) {  }
  
  }
