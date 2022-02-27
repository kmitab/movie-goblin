import { Component, Input } from '@angular/core';

import { SingularResult } from '../singular.result';
import { PluralResult } from '../plural.result';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result-brief-vertical',
  templateUrl: './result-brief-vertical.component.html',
  styleUrls: ['./result-brief-vertical.component.css']
})
export class ResultBriefVerticalComponent {

  @Input() results?: [SingularResult, PluralResult];

  constructor(public searchService: SearchService) { }
}
