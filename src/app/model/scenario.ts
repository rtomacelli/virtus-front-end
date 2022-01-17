import { HttpClient } from "@angular/common/http";
import { FeatureService } from "../service/feature/feature.service";
import { MessageService } from "../service/message/message.service";
import { Feature } from "./feature";

export class Scenario {
  public id!: number
    constructor(
      public name: string,
      public description: string,
      public story: string,
      public featureName?: string,
      public featureId?: number,
    ) {  }
  
  }
