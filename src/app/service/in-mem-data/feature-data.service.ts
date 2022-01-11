import { Injectable } from '@angular/core';
import { RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureDataService extends DataService {
  putFeature(features: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromFeatureUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = features.find((b) => b.id === info.id);
      } else {
        data = features
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
          body: { error: `Feature with id = '\$\{info.id\}' not found` },
          status: STATUS.NOT_FOUND
        };
      return this.finishOptions(options, reqInfo);
    });
  }

  public getFeatures(features: any[], reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const info = this.getInfoFromFeatureUrl(reqInfo.req.url);
      let data: any;

      if (info.id) {
        data = features.find((b) => b.id === info.id);
      } else {
        data = features
      }

      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const options: ResponseOptions = data ?
        {
          body: dataEncapsulation ? { data } : data,
          status: 200
        } :
        {
          body: { error: `Feature with id = '\$\{info.id\}' not found` },
          status: 404
        };
      return this.finishOptions(options, reqInfo);
    });
  }


  public getInfoFromFeatureUrl(url: string): any {
    console.log(url)
    const regex = /api\/feature\/(.*)$/i;
    const matches = regex.exec(url);
    const parts = matches && matches.length === 2 ? matches[1].split('/') : [];
    return {
      id: +parts[0],
    };
  }

  constructor() { super() }
}
