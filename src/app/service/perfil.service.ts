import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';

export class Perfil {

  perfil_id?: number;
  name?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})


export class PerfilService {

  /*/
  endpoint = GlobalConstants.finalApiURL;
	/*/
  endpoint = GlobalConstants.testApiURL;
  //*/
  
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPerfil(): Observable<Perfil> {
    return this.httpClient
      .get<Perfil>(this.endpoint + '/perfis/')
      .pipe(retry(1), catchError(this.processError));
  }

  getSinglePerfil(id: any): Observable<Perfil> {
    return this.httpClient
      .get<Perfil>(this.endpoint + '/perfis/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addPerfil(data: any): Observable<Perfil> {
    return this.httpClient
      .post<Perfil>(
        this.endpoint + '/perfis',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updatePerfil(id: any, data: any): Observable<Perfil> {
    return this.httpClient
      .put<Perfil>(
        this.endpoint + '/perfis/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deletePerfil(id: any) {
    return this.httpClient
      .delete<Perfil>(this.endpoint + '/perfis/' + id, this.httpHeader)
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