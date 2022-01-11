import { User } from "./user";

export class Schedule {
  public id!: number
    constructor(
      public name: string,
      public description?: string,
      public userId: number = 0,
      public user?: User,
    ) {  }
  
  }
