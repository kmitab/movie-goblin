import { Component } from '@angular/core';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result-brief',
  templateUrl: './result-brief.component.html',
  styleUrls: ['./result-brief.component.css']
})
export class ResultBriefComponent {
  constructor(public searchService: SearchService) { }
}
