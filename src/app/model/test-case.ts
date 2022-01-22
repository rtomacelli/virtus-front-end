import { Context } from "./context";
import { Environment } from "./environment";
import { Feature } from "./feature";

export class TestCase {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public scenarioId: number = 0,
      public environmentId: number = 0,
      public contextId: number = 0,
    ) {  }
  
  }
