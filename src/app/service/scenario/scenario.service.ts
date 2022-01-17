import { Injectable } from '@angular/core';
import { Scenario } from '../../model/scenario';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { FeatureService } from '../feature/feature.service';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
    })
  };
  private scenariosUrl = 'http://mohashi21.ngrok.io/scenario';

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
    console.log("addScenario: " + scenario.name)
    console.log("addScenario - featureId: " + scenario.featureId)
    const data = JSON.stringify(scenario);
    return this.http.post<Scenario>(this.scenariosUrl, data).pipe(
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
    console.log("updatedScenario: " + scenario.name)
    console.log("updatedScenario - featureId: " + scenario.featureId)
    let data = JSON.stringify(scenario);
    console.log("updatedScenario: " + data)
    return this.http.put<any>(this.scenariosUrl, data);
  }

  deleteScenario(id: number): Observable<Scenario> {
    const url = `${this.scenariosUrl}/${id}`;
    return this.http.delete<Scenario>(url).pipe(
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
