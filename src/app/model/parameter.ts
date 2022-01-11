import { Context } from "./context";

export class Parameter {
  public id!: number
    constructor(
      public name: string,
      public value: string,
      public description?: string,
      public contextId: number = 0,
      public context?: Context,
    ) {  }
  
  }
