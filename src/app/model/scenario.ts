import { HttpClient } from "@angular/common/http";
import { MessageService } from "../service/message/message.service";

export class Scenario {
  public id!: number
    constructor(
      public name: string,
      public description: string,
      public listOfSteps: string,
      public position?: string,
      public result?: string,
    ) {  }
  
  }
