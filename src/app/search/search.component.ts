import { Component } from '@angular/core';

import { SearchService } from '../services/search.service';
import { ResultType } from '../result.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  resultType = ResultType;

  constructor(public searchService: SearchService) { }

  search(term: string, type?: ResultType) {
    this.searchService.combinedChange.next({
      "term": term,
      "page": 1,
      "type": type
    });
  }
}
