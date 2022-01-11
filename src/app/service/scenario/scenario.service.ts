import { Injectable } from '@angular/core';
import { Scenario } from '../../model/scenario';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private scenariosUrl = 'api/scenario';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getScenarios(): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(this.scenariosUrl)
      .pipe(
        catchError(this.handleError<Scenario[]>("getScenarios", []))
      )
  }

  addScenario(scenario: Scenario): Observable<Scenario> {
    console.log("addScenario: "+scenario.name)
    return this.http.post<Scenario>(this.scenariosUrl, scenario, this.httpOptions).pipe(
      tap((newScenario: Scenario) => this.log(`added scenario w/ id=${newScenario.id}`)),
      catchError(this.handleError<Scenario>("addScenario"))
    );
  }

  getScenario(id: number): Observable<Scenario> {
    const url = `${this.scenariosUrl}/${id}`;
    return this.http.get<Scenario>(url).pipe(
      tap(_ => this.log(`fetched scenario id=${id}`)),
      catchError(this.handleError<Scenario>(`getScenario id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateScenario(scenario: Scenario): Observable<any> {
    return this.http.put(this.scenariosUrl, scenario, this.httpOptions).pipe(
      tap(_ => this.log(`updated scenario id=${scenario.id}`)),
      catchError(this.handleError<any>('updateScenario'))
    );
  }

  deleteScenario(id: number): Observable<Scenario> {
    const url = `${this.scenariosUrl}/${id}`;
    return this.http.delete<Scenario>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted scenario id=${id}`)),
      catchError(this.handleError<Scenario>('deleteScenario'))
    );
  }

  searchScenarios(term: string): Observable<Scenario[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Scenario[]>(`${this.scenariosUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found scenarios matching "${term}"`) :
        this.log(`no scenarios matching "${term}"`)),
      catchError(this.handleError<Scenario[]>('searchScenarios', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ScenarioService: ${message}`);
  }
}
