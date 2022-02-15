import { Component, Input, OnInit } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  @Input()
  initData?: {
    imdbID: string,
    Type: string,
    seriesID: string,
    totalSeasons: string;
    Season: string;
  };

  constructor(public episodesService: EpisodesService) { }

  ngOnInit() { }

  onClickSeasons() {
    if (!this.initData) {
      return;
    }

    if (this.initData.Type == "series") {
      this.episodesService.seasonsFromSeries(
        this.initData.imdbID,
        Number(this.initData.totalSeasons) || 0
      );
    }

    if (this.initData.Type == "episode") {
      this.episodesService.seasonsFromEpisode(
        this.initData.seriesID,
        Number(this.initData.Season) || 0
      );
    }
  }

  onClickSeason(season: number) {
    if (!this.initData || season < 1) {
      return;
    }
    console.log(`onClickSeason: ${season}`);

    if (this.initData.Type == "series") {
      this.episodesService.changeSeason(
        this.initData.imdbID,
        season
      );
    } else if (this.initData.Type == "episode") {
      this.episodesService.changeSeason(
        this.initData.seriesID,
        season
      );
    } else {
      console.log("wtf?");
    }
  }

  onClickEpisodes() {
    if (!this.initData) {
      return;
    }
    if (this.initData.Type == "series") {
      this.episodesService.episodesFromSeries(
        this.initData.imdbID,
        Number(this.initData.totalSeasons) || 0
      );
    } else if (this.initData.Type == "episode") {
      this.episodesService.episodesFromEpisode(
        this.initData.seriesID,
        Number(this.initData.Season) || 0
      );
      //this.episodesService.panicSeason(this.getSeriesID());
      // this.episodesService.changeSeason(
      //   this.initData.seriesID,
      //   Number(this.initData.Season) || 1
      // );
    }


  }
}
