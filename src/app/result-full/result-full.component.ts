import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { FilmService } from '../services/film.service';
import { SingularResult } from '../singular.result';

@Component({
  selector: 'app-result-full',
  templateUrl: './result-full.component.html',
  styleUrls: ['./result-full.component.css']
})
export class ResultFullComponent implements OnInit {

  selectedFilm$?: Observable<SingularResult>;

  constructor(private route: ActivatedRoute, private filmService: FilmService) { }

  ngOnInit(): void {
    this.updateSelectedFilm();
    this.route.params.subscribe(() => this.updateSelectedFilm());
  }

  updateSelectedFilm() {
    const id = this.route.snapshot.paramMap.get('i');
    if (id)
      this.selectedFilm$ = this.filmService.getFilmById(id);
  }

}
