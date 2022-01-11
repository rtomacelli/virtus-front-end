import { Injectable } from '@angular/core';
import { RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DataService {
  putUser(users: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromUserUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = users.find((b) => b.id === info.id);
      } else {
        data = users
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
          body: { error: `User with id = '\$\{info.id\}' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  public getUsers(users: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromUserUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = users.find((b) => b.id === info.id);
      } else {
        data = users
      }

      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: 200
        } :
        {
          body: { error: `User with id = '\$\{info.id\}' not found` },
          status: 404
        };
      return this.finishOptions(options, reqInfo);
    });
  }


  public getInfoFromUserUrl(url: string): any {
    console.log(url)
    const regex = /api\/user\/(.*)$/i;
    const matches = regex.exec(url);
    const parts = matches && matches.length === 2 ? matches[1].split('/') : [];
    return {
      id: +parts[0],
    };
  }

  constructor() { super() }
}
