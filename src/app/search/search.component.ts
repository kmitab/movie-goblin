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
  currentResultPage?: number;
  currentSearchTerm?: string;
  private searchSingular = new Subject<string>();

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.singular$ = this.searchSingular.pipe(
      debounceTime(300), // wait 300 ms after each keystroke
      distinctUntilChanged(), // ignore if new = previous term
      tap((term: string) => this.setPagingInfo(term, 1)),
      tap(() => this.updatePluralResult()),
      switchMap((term: string) => this.filmService.getFilmByTitle(term)),
    );
  }

  // Push a search term into the observable stream.
  search(term: string) {
    this.searchSingular.next(term);
  }

  updatePluralResult() {
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
