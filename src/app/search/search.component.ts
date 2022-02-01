import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { FilmService } from '../services/film.service';
import { PluralResult } from '../plural.result';
import { SingularResult } from '../singular.result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  singular$?: Observable<SingularResult>;
  plural$?: Observable<PluralResult>;
  private searchSingular = new Subject<string>();

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.singular$ = this.searchSingular.pipe(
      debounceTime(300), // wait 300 ms after each keystroke
      distinctUntilChanged(), // ignore if new = previous term
      tap((term: string) => this.updatePluralResult(term)),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.filmService.getFilmByTitle(term)),
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchSingular.next(term);
  }

  updatePluralResult(term: string) {
    this.plural$ = this.filmService.searchFilms(term);
  }
}
