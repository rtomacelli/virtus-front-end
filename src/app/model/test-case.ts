import { Context } from "./context";
import { Environment } from "./environment";
import { Feature } from "./feature";

export class TestCase {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public featureId: number = 0,
      public feature?: Feature,
      public environmentId: number = 0,
      public environment?: Environment,
      public contextId: number = 0,
      public context?: Context,
    ) {  }
  
  }
