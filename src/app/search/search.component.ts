import { Component } from '@angular/core';

import { SearchService } from '../services/search.service';
import { ResultType } from '../result.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  currentResultType = ResultType.All;

  constructor(private searchService: SearchService) { }

  search(term: string) {
    this.searchService.combinedChange.next({
      "term": term,
      "page": 1,
      "type": this.currentResultType
    });
  }
}
