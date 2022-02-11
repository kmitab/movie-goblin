import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  pageNumberChange = new BehaviorSubject<number>(1);
  pageNumberOutput$ = this.pageNumberChange.pipe(
    distinctUntilChanged(),
    tap(n => console.log(`pageNumberOutput: ${n}`)),
  );
  combinedChange = new Subject<{ term?: string, page?: number; }>();
  combinedOutput$ = this.combinedChange.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(({ term: term, page: page }) => this.search(term, page)),
  );
  private currentSearchTerm?: string;
  private currentPageNumber = 1;

  constructor(private filmService: FilmService) { }

  private search(term?: string, page?: number) {

    // use given term/page or last term/page if none given
    this.currentSearchTerm = term ?? this.currentSearchTerm;
    this.currentPageNumber = page ?? this.currentPageNumber;

    // update Subject/Observable announcing page change
    this.pageNumberChange.next(this.currentPageNumber);

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
    this.pageNumberChange.next(this.currentPageNumber);
    this.combinedChange.next({ page: this.currentPageNumber });
  }

  prevPage() {
    this.currentPageNumber--;
    this.pageNumberChange.next(this.currentPageNumber);
    this.combinedChange.next({ page: this.currentPageNumber });
  }
}
