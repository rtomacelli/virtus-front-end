import { Injectable } from '@angular/core';
import { Feature } from '../../model/feature';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private featuresUrl = 'http://localhost:5000/feature';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.featuresUrl)
      .pipe(
        catchError(this.handleError<Feature[]>("getFeatures", []))
      )
  }

  addFeature(feature: Feature): Observable<Feature> {
    console.log("addFeature: "+feature.name)
    return this.http.post<Feature>(this.featuresUrl, feature).pipe(
      tap((newFeature: Feature) => this.log(`added feature w/ id=${newFeature.id}`)),
      catchError(this.handleError<Feature>("addFeature"))
    );
  }

  getFeature(id: number): Observable<Feature> {
    const url = `${this.featuresUrl}/${id}`;
    return this.http.get<Feature>(url).pipe(
      tap(_ => this.log(`fetched feature id=${id}`)),
      catchError(this.handleError<Feature>(`getFeature id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateFeature(feature: Feature): Observable<any> {
    return this.http.put(this.featuresUrl, feature).pipe(
      tap(_ => this.log(`updated feature id=${feature.id}`)),
      catchError(this.handleError<any>('updateFeature'))
    );
  }

  deleteFeature(id: number): Observable<Feature> {
    const url = `${this.featuresUrl}/${id}`;
    return this.http.delete<Feature>(url).pipe(
      tap(_ => this.log(`deleted feature id=${id}`)),
      catchError(this.handleError<Feature>('deleteFeature'))
    );
  }

  searchFeatures(term: string): Observable<Feature[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Feature[]>(`${this.featuresUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found features matching "${term}"`) :
        this.log(`no features matching "${term}"`)),
      catchError(this.handleError<Feature[]>('searchFeatures', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`FeatureService: ${message}`);
  }
}
