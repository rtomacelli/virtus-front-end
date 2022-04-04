import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';

@Injectable({
  providedIn: 'root'
})

export class Office {
nome?: string;
abreviatura?: string;
descricao?: string;
chefe_id?: number;
author_id?: number;
criado_em?: string;
id_versao_origem?: number;
status_id?: number;
}

@Injectable({
  providedIn: 'root'
})

export class OfficeService  {

  endpoint = GlobalConstants.apiURL;
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

/*

SQL que lista todos dados 

SELECT 
    office.id,
    office.abreviatura,
    usuario.name,
    office.author_id,
    chefe.name,
    office.chefe_id,
    office.criado_em,
    office.descricao,
    office.id_versao_origem,
    office.nome,
    office.status_id,
    status.name
FROM
  virtus.office AS office
      INNER JOIN
  virtus.status AS status ON virtus.office.status_id = status.status_id
      INNER JOIN
  virtus.user AS usuario ON virtus.office.author_id = usuario.author_id
      INNER JOIN
  virtus.user AS chefe ON virtus.office.chefe_id = chefe.author_id
  */

  getOffice(): Observable<Office> {
    return this.httpClient
      .get<Office>(this.endpoint + '/office/list')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleOffice(id: any): Observable<Office> {
    return this.httpClient
      .get<Office>(this.endpoint + '/office/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addOffice(data: any): Observable<Office> {
    return this.httpClient
      .post<Office>(
        this.endpoint + '/office',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateOffice(id: any, data: any): Observable<Office> {
    return this.httpClient
      .put<Office>(
        this.endpoint + '/office/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteOffice(id: any) {
    return this.httpClient
      .delete<Office>(this.endpoint + '/office/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}