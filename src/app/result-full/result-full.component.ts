import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { FilmService } from '../services/film.service';
import { SingularResult } from '../singular.result';

@Component({
  selector: 'app-result-full',
  templateUrl: './result-full.component.html',
  styleUrls: ['./result-full.component.css']
})
export class ResultFullComponent implements OnInit {

  params?: Subscription;
  selectedFilm$?: Observable<SingularResult>;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) { }

  ngOnInit() {
    this.params = this.route.params.subscribe(
      params => this.selectedFilm$ = this.filmService.getFilmById(params["i"])
    );
  }

  ngOnDestroy() {
    this.params?.unsubscribe();
  }
}
