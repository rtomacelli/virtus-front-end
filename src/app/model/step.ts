import { Feature } from "./feature";

export class Step {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public featureId: number = 0,
      public feature?: Feature,
    ) {  }
  
  }
