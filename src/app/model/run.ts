import { Arguments } from "./arguments";
import { Context } from "./context";

export class Run {
  public id!: number
    constructor(
      public name: string,
      public scenarioId?: string,
      public listOfSteps?: string,
      public description?: string,
      public result?: string,
      public logs?: string,
      public environmentId?: string,
      public contextId?: string,
      public userId?: string,
      public runAt?: string,
      public tags?: string,
      public context?: Context,
      public args?: Arguments,
    ) {  }
  
  }
