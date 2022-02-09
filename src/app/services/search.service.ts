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

  constructor(private filmService: FilmService) { }

  searchCombined(term?: string, page?: number) {
    this.currentSearchTerm = term ?? this.currentSearchTerm ?? "";
    console.log(`currentSearchTerm: ${this.currentSearchTerm}, page: ${page}`);
    return zip([
      this.filmService.getFilmByTitle(this.currentSearchTerm),
      this.filmService.searchFilms(this.currentSearchTerm, page)
    ]);
  }

}
