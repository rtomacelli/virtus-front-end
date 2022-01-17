import { Context } from "./context";
import { Environment } from "./environment";
import { TestCase } from "./test-case";
import { User } from "./user";

export class Run {
  public id!: number
    constructor(
      public name: string,
      public story?: string,
      public description?: string,
      public environmentId: number = 0,
      public environment?: Environment,
      public contextId: number = 0,
      public context?: Context,
      public testCaseId: number = 0,
      public testCase?: TestCase,
      public userId: number = 0,
      public user?: User,
    ) {  }
  
  }
