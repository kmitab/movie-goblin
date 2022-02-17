import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result-brief-horizontal',
  templateUrl: './result-brief-horizontal.component.html',
  styleUrls: ['./result-brief-horizontal.component.css']
})
export class ResultBriefHorizontalComponent implements OnInit {

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
  }

}
