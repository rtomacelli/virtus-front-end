import { Context } from "./context";

export class Parameter {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public value?: string,
      public contextId: number = 0,
      public contextName?: string,
      public position?: string,
    ) {  }
  
  }
