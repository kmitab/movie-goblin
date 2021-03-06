import { Component, Input } from '@angular/core';

import { SingularResult } from '../singular.result';
import { PluralResult } from '../plural.result';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result-brief-horizontal',
  templateUrl: './result-brief-horizontal.component.html',
  styleUrls: ['./result-brief-horizontal.component.css']
})
export class ResultBriefHorizontalComponent {

  @Input() results?: [SingularResult, PluralResult];

  constructor(public searchService: SearchService) { }
}
