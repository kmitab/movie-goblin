import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PluralResult } from '../plural.result';
import { SearchService } from '../services/search.service';
import { SingularResult } from '../singular.result';

@Component({
  selector: 'app-result-brief',
  templateUrl: './result-brief.component.html',
  styleUrls: ['./result-brief.component.css']
})
export class ResultBriefComponent implements OnInit {

  oCombined$?: Observable<[SingularResult, PluralResult]>;
  pageNumber = 1;
  currentFilmSelection?: string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.oCombined$ = this.searchService.oCombined$.pipe(
      tap(result => {
        if (this.currentFilmSelection != result[0].imdbID) {
          console.log("film changed, resetting page navigation");
          this.pageNumber = 1;
        }
        this.currentFilmSelection = result[0].imdbID;
      })
    );
  }

  nextPage() {
    this.pageNumber++;
    this.searchService.ioCombined.next({ page: this.pageNumber });
  }

  prevPage() {
    this.pageNumber--;
    this.searchService.ioCombined.next({ page: this.pageNumber });
  }

}
