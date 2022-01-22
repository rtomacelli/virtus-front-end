import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Context } from 'src/app/model/context';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
    })
  };
  private contextsUrl = 'http://localhost:5002/context';
  private environmentsUrl = 'http://localhost:5002/environment';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getContexts(): Observable<Context[]> {
    return this.http.get<Context[]>(this.contextsUrl)
      .pipe(
        catchError(this.handleError<Context[]>("getContexts", []))
      )
  }
  getContextsByEnvironmentId(environmentId: number): Observable<Context[]> {
    const url = `${this.environmentsUrl}/${environmentId}/context`;
    return this.http.get<Context[]>(url)
      .pipe(
        catchError(this.handleError<Context[]>("getContextsByEnvironmentId", []))
      )
  }

  addContext(context: Context): Observable<Context> {
    console.log("addContext: " + context.name)
    console.log("addContext - environmentId: " + context.environmentId)
    const data = JSON.stringify(context);
    return this.http.post<Context>(this.contextsUrl, data).pipe(
      tap((newContext: Context) => this.log(`added context w/ id=${newContext.id}`)),
      catchError(this.handleError<Context>("addContext"))
    );
  }

  getContext(id: number): Observable<Context> {
    const url = `${this.contextsUrl}/${id}`;
    return this.http.get<Context>(url).pipe(
      tap(_ => this.log(`fetched context id=${id}`)),
      catchError(this.handleError<Context>(`getContext id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateContext(context: Context): Observable<any> {
    const data = JSON.stringify(context);
    return this.http.put(this.contextsUrl, data).pipe(
      tap(_ => this.log(`updated context id=${context.id}`)),
      catchError(this.handleError<any>('updateContext'))
    );
  }

  deleteContext(id: number): Observable<Context> {
    const url = `${this.contextsUrl}/${id}`;
    return this.http.delete<Context>(url).pipe(
      tap(_ => this.log(`deleted context id=${id}`)),
      catchError(this.handleError<Context>('deleteContext'))
    );
  }

  searchContexts(term: string): Observable<Context[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Context[]>(`${this.contextsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found contexts matching "${term}"`) :
        this.log(`no contexts matching "${term}"`)),
      catchError(this.handleError<Context[]>('searchContexts', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ContextService: ${message}`);
  }
}
