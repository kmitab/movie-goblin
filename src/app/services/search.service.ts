import { Injectable } from '@angular/core';
import { Subject, zip } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  ioCombined = new Subject<{ term?: string, page?: number; }>();
  oCombined$ = this.ioCombined.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(({ term: term, page: page }) => this.searchCombined(term, page)),
  );
  private currentSearchTerm?: string;
  private currentPageNumber = 1;

  constructor(private filmService: FilmService) { }

  private searchCombined(term?: string, page?: number) {

    // use given term/page or last term/page if none given
    this.currentSearchTerm = term ?? this.currentSearchTerm;
    this.currentPageNumber = page ?? this.currentPageNumber;

    console.log(`currentSearchTerm: ${this.currentSearchTerm}, page: ${page}`);

    return zip([
      // only get full film info for first page
      this.filmService.getFilmByTitle(page == 1 ? this.currentSearchTerm : undefined),
      this.filmService.searchFilms(this.currentSearchTerm, page)
    ]);
  }

  nextPage() {
    this.currentPageNumber++;
    this.ioCombined.next({ page: this.currentPageNumber });
  }

  prevPage() {
    this.currentPageNumber--;
    this.ioCombined.next({ page: this.currentPageNumber });
  }

  getPageNumber(): number {
    console.log("getPageNumber");
    return this.currentPageNumber;
  }

}
