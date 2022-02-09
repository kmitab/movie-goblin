import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result-brief',
  templateUrl: './result-brief.component.html',
  styleUrls: ['./result-brief.component.css']
})
export class ResultBriefComponent {

  pageNumber = 1;

  constructor(public searchService: SearchService) { }

  nextPage() {
    this.pageNumber++;
    this.searchService.ioCombined.next({ page: this.pageNumber });
  }

}
