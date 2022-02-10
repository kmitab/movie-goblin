import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-result-brief',
  templateUrl: './result-brief.component.html',
  styleUrls: ['./result-brief.component.css']
})
export class ResultBriefComponent implements OnInit {

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
    console.log("ResultBriefComponent ngOnInit");
  }

}
