import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PluralResult } from '../plural.result';
import { SingularResult } from '../singular.result';

@Component({
  selector: 'app-result-brief',
  templateUrl: './result-brief.component.html',
  styleUrls: ['./result-brief.component.css']
})
export class ResultBriefComponent implements OnInit {

  @Input() film$?: Observable<SingularResult>;
  @Input() films$?: Observable<PluralResult>;

  constructor() { }

  ngOnInit() { }

}
