import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { PluralResult } from '../plural.result';
import { SearchService } from '../services/search.service';
import { SingularResult } from '../singular.result';

@Component({
  selector: 'app-result-brief',
  templateUrl: './result-brief.component.html',
  styleUrls: ['./result-brief.component.css']
})
export class ResultBriefComponent implements OnInit {

  combined$: Observable<[SingularResult, PluralResult]>;

  constructor(private searchService: SearchService) {
    this.combined$ = zip([this.searchService.singular$, this.searchService.plural$]);
  }

  ngOnInit() { }
}
