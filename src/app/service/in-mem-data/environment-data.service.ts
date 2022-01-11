import { Injectable } from '@angular/core';
import { RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentDataService extends DataService {
  putEnvironment(environments: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromEnvironmentUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = environments.find((b) => b.id === info.id);
      } else {
        data = environments
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
          body: { error: `Environment with id = '\$\{info.id\}' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  public getEnvironments(environments: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromEnvironmentUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = environments.find((b) => b.id === info.id);
      } else {
        data = environments
      }

      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: 200
        } :
        {
          body: { error: `Environment with id = '\$\{info.id\}' not found` },
          status: 404
        };
      return this.finishOptions(options, reqInfo);
    });
  }


  public getInfoFromEnvironmentUrl(url: string): any {
    console.log(url)
    const regex = /api\/environment\/(.*)$/i;
    const matches = regex.exec(url);
    const parts = matches && matches.length === 2 ? matches[1].split('/') : [];
    return {
      id: +parts[0],
    };
  }

  constructor() { super() }
}
