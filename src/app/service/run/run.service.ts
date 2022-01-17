import { Injectable } from '@angular/core';
import { Run } from '../../model/run';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private runsUrl = 'http://localhost:5000/run';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    run(model: Run): Observable<Run> {
      console.log("RUNNING")
      throw new Error('Method not implemented.');
    }

    getRuns(): Observable<Run[]> {
    return this.http.get<Run[]>(this.runsUrl)
      .pipe(
        catchError(this.handleError<Run[]>("getRuns", []))
      )
  }

  addRun(run: Run): Observable<Run> {
    console.log("addRun: "+run.name)
    return this.http.post<Run>(this.runsUrl, run).pipe(
      tap((newRun: Run) => this.log(`added run w/ id=${newRun.id}`)),
      catchError(this.handleError<Run>("addRun"))
    );
  }

  getRun(id: number): Observable<Run> {
    const url = `${this.runsUrl}/${id}`;
    return this.http.get<Run>(url).pipe(
      tap(_ => this.log(`fetched run id=${id}`)),
      catchError(this.handleError<Run>(`getRun id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateRun(run: Run): Observable<any> {
    return this.http.put(this.runsUrl, run).pipe(
      tap(_ => this.log(`updated run id=${run.id}`)),
      catchError(this.handleError<any>('updateRun'))
    );
  }

  deleteRun(id: number): Observable<Run> {
    const url = `${this.runsUrl}/${id}`;
    return this.http.delete<Run>(url).pipe(
      tap(_ => this.log(`deleted run id=${id}`)),
      catchError(this.handleError<Run>('deleteRun'))
    );
  }

  searchRuns(term: string): Observable<Run[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Run[]>(`${this.runsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found runs matching "${term}"`) :
        this.log(`no runs matching "${term}"`)),
      catchError(this.handleError<Run[]>('searchRuns', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`RunService: ${message}`);
  }
}
