import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private searchService: SearchService) { }

  search(term: string) {
    this.searchService.searchSingular.next(term);
    this.searchService.searchPlural.next(term);
  }
}
