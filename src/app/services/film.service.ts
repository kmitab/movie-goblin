import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SingularResponse } from '../singular.reponse';
import { PluralResponse } from '../plural.response';
import { PluralResult } from '../plural.result';
import { SingularResult } from '../singular.result';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = "http://127.0.0.1:8000";
  private sharedOptions = { responseType: 'json' as const };

  constructor(private http: HttpClient) { }

  getFilmById(imdbID?: string): Observable<SingularResult> {

    // if imdbID is None: return object_with_empty_body
    imdbID = imdbID ? imdbID.trim() : imdbID;
    if (!imdbID) {
      return of(new SingularResult());
    }

    const options = Object.assign(
      this.sharedOptions,
      { params: new HttpParams().set('plot', "full") }
    );

    return this.http.get<SingularResponse>(this.apiUrl + `/i/${imdbID}`, options)
      .pipe(
        map((singularResponse: SingularResponse) => new SingularResult(singularResponse)),
        tap(console.log),
        catchError(this.handleError<SingularResult>("getFilmById", imdbID, new SingularResult()))
      );
  }

  getFilmByTitle(title?: string, type?: string): Observable<SingularResult> {

    // if title is None: return object_with_empty_body
    title = title ? title.trim() : title;
    if (!title) {
      return of(new SingularResult());
    }

    let params = new HttpParams();
    if (type)
      params.append("type", type);

    const options = Object.assign(
      this.sharedOptions,
      { params }
    );

    return this.http.get<SingularResponse>(this.apiUrl + `/t/${title}`, options)
      .pipe(
        map((singularResponse: SingularResponse) => new SingularResult(singularResponse)),
        tap(console.log),
        catchError(this.handleError<SingularResult>("getFilmByTitle", title, new SingularResult()))
      );
  }

  searchFilms(title?: string, page?: number, type?: string): Observable<PluralResult> {

    // if title is None: return object_with_empty_body
    title = title ? title.trim() : title;
    if (!title) {
      return of(new PluralResult());
    }

    let params = new HttpParams();
    if (page)
      params = params.append("page", page);
    if (type)
      params = params.append("type", type);

    const options = Object.assign(
      this.sharedOptions,
      { params }
    );

    return this.http.get<PluralResponse>(this.apiUrl + `/s/${title}`, options)
      .pipe(
        map((pluralResponse: PluralResponse) => new PluralResult(pluralResponse)),
        tap(console.log),
        catchError(this.handleError<PluralResult>("searchFilms", title, new PluralResult()))
      );
  }

  private handleError<T>(operation: string, param: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}(${param}): ${error}`);
      return of(result as T);
    };
  }
}
