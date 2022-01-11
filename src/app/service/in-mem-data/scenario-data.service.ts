import { Injectable } from '@angular/core';
import { RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ScenarioDataService extends DataService {
  putScenario(scenarios: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromScenarioUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = scenarios.find((b) => b.id === info.id);
      } else {
        data = scenarios
      }
      const body = reqInfo.utils.getJsonBody(reqInfo.req)
      Object.assign(info, body);
      
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: STATUS.OK
        } :
        {
          body: { error: `Scenario with id = '\$\{info.id\}' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  public getScenarios(scenarios: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromScenarioUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = scenarios.find((b) => b.id === info.id);
      } else {
        data = scenarios
      }

      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: 200
        } :
        {
          body: { error: `Scenario with id = '\$\{info.id\}' not found` },
          status: 404
        };
      return this.finishOptions(options, reqInfo);
    });
  }


  public getInfoFromScenarioUrl(url: string): any {
    console.log(url)
    const regex = /api\/scenario\/(.*)$/i;
    const matches = regex.exec(url);
    const parts = matches && matches.length === 2 ? matches[1].split('/') : [];
    return {
      id: +parts[0],
    };
  }

  constructor() { super() }
}
