import { Scenario } from "./scenario";

export class TestCase {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public environmentId?: number,
      public contextId?: string,
      public scenarios?: Scenario[],
    ) {  }
  
  }
