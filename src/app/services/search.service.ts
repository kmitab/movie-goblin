import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { PluralResult } from '../plural.result';
import { SingularResult } from '../singular.result';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  singular$: Observable<SingularResult>;
  plural$: Observable<PluralResult>;
  searchSingular = new Subject<string>();
  searchPlural = new Subject<string>();
  currentResultPage?: number;
  currentSearchTerm?: string;

  constructor(private filmService: FilmService) {
    console.log("SearchService constructor()");

    this.singular$ = this.searchSingular.pipe(
      debounceTime(300), // wait 300 ms after each keystroke
      distinctUntilChanged(), // ignore if new = previous term
      switchMap((term: string) => this.filmService.getFilmByTitle(term)),
    );

    this.plural$ = this.searchPlural.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((term: string) => this.setPagingInfo(term, 1)),
      switchMap(
        () => this.filmService.searchFilms(
          this.currentSearchTerm ?? "", this.currentResultPage
        )
      )
    );
  }

  updatePluralResult() {
    console.log("SearchService updatePluralResult(): " + this.currentSearchTerm);
    this.plural$ = this.filmService.searchFilms(this.currentSearchTerm ?? "", this.currentResultPage);
  }

  setPagingInfo(term: string, page: number) {
    this.currentSearchTerm = term;
    this.currentResultPage = page;
  }

  nextResultPage() {
    if (this.currentResultPage) {
      this.currentResultPage++;
      this.updatePluralResult();
    }
  }

  previousResultPage() {
    if (this.currentResultPage && this.currentResultPage > 1) {
      this.currentResultPage--;
      this.updatePluralResult();
    }
  }
}
