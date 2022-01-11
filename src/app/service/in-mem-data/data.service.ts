  import { Injectable } from '@angular/core';
  import { RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';

  @Injectable({
    providedIn: 'root'
  })
  export class DataService{


    public finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
      if (options.status) {
        options.statusText = this.getStatusText(options.status);
      } else {
        options.statusText = this.getStatusText(STATUS.OK);
      }
      options.headers = headers;
      options.url = url;
      return options;
    }

    
    protected getStatusText(httpStatusCode: number): string {
    switch (httpStatusCode) {
      case STATUS.OK:
        return 'Ok';
      case STATUS.NOT_FOUND:
        return 'Not found';
      case STATUS.INTERNAL_SERVER_ERROR:
        return 'Internal server error';
      default:
        return '';
    }
  }

    constructor() { }
  }