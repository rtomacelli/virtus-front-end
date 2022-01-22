import { Arguments } from "./arguments";

export class Run {
  public id!: number
    constructor(
      public name: string,
      public scenarioId?: number,
      public listOfSteps?: string,
      public description?: string,
      public result?: string,
      public logs?: string,
      public featureId?: number,
      public featureName?: string,
      public environmentId?: number,
      public contextId?: number,
      public userId?: number,
      public runAt?: string,
      public args?: Arguments,
    ) {  }
  
  }
