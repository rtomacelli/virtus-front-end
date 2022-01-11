import { Injectable } from '@angular/core';
import { RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StepDataService extends DataService {
  putStep(steps: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromStepUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = steps.find((b) => b.id === info.id);
      } else {
        data = steps
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
          body: { error: `Step with id = '\$\{info.id\}' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  public getSteps(steps: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromStepUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = steps.find((b) => b.id === info.id);
      } else {
        data = steps
      }

      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: 200
        } :
        {
          body: { error: `Step with id = '\$\{info.id\}' not found` },
          status: 404
        };
      return this.finishOptions(options, reqInfo);
    });
  }


  public getInfoFromStepUrl(url: string): any {
    console.log(url)
    const regex = /api\/step\/(.*)$/i;
    const matches = regex.exec(url);
    const parts = matches && matches.length === 2 ? matches[1].split('/') : [];
    return {
      id: +parts[0],
    };
  }

  constructor() { super() }
}
