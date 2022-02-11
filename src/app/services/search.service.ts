import { Injectable } from '@angular/core';
import { BehaviorSubject, of, zip } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { FilmService } from './film.service';

enum ResultType {
  All = "",
  Movie = "movie",
  Series = "series",
  Episode = "episode",
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private currentSearchTerm?: string;
  private currentPageNumber = 1;
  private currentResultType = ResultType.All;

  // main insertion point for data in this service
  combinedChange = new BehaviorSubject<{ term?: string, page?: number, type?: ResultType; }>({});

  combinedResults$ = this.combinedChange.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(({ term: term, page: page, type: type }) => this.search(term, page, type)),
  );
  navigation$ = this.combinedChange.pipe(
    distinctUntilChanged(),
    switchMap(({ page: page }) => of(page)),
  );

  constructor(private filmService: FilmService) { }

  private search(term?: string, page?: number, type?: ResultType) {

    // use given term/page or last term/page if none given
    this.currentSearchTerm = term ?? this.currentSearchTerm;
    this.currentPageNumber = page ?? this.currentPageNumber;
    this.currentResultType = type ?? this.currentResultType;

    console.log(`currentSearchTerm: ${this.currentSearchTerm}, page: ${page}`);

    return zip([
      page == 1 // only get full film info for first page
        ? this.filmService.getFilmByTitle(this.currentSearchTerm)
        : this.filmService.getFilmByTitle(),
      this.filmService.searchFilms(this.currentSearchTerm, page)
    ]);
  }

  nextPage() {
    this.currentPageNumber++;
    this.combinedChange.next({ page: this.currentPageNumber });
  }

  prevPage() {
    this.currentPageNumber--;
    this.combinedChange.next({ page: this.currentPageNumber });
  }

  setResultType(resultType: ResultType) {
    this.currentResultType = resultType;
    this.combinedChange.next({ type: this.currentResultType });
  }
}
