import { Component, Input, OnInit } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  @Input()
  set initData({ imdbID, Type, seriesID, totalSeasons, Season }
      : {
        imdbID?: string,
        Type?: string,
        seriesID?: string,
        totalSeasons?: number,
        Season?: number;
      }) {
    this.imdbID = imdbID ?? "";
    this.Type = Type ?? "";
    this.seriesID = seriesID ?? "";
    this.totalSeasons = totalSeasons ?? 0;
    this.Season = Season ?? 0;
  }

  private imdbID!: string;
  private Type!: string;
  private seriesID!: string;
  private totalSeasons!: number;
  private Season!: number;

  constructor(public episodesService: EpisodesService) { }

  ngOnInit() { }

  onClickSeasons() {
    if (this.Type == "series") {
      this.episodesService.seasonsFromSeries(
        this.imdbID,
        this.totalSeasons
      );
    }

    if (this.Type == "episode") {
      this.episodesService.seasonsFromEpisode(
        this.seriesID,
        this.Season
      );
    }
  }

  onClickSeason(season: number) {
    if (season < 1) {
      return;
    }
    console.log(`onClickSeason: ${season}`);

    if (this.Type == "series") {
      this.episodesService.changeSeason(
        this.imdbID,
        season
      );
    } else if (this.Type == "episode") {
      this.episodesService.changeSeason(
        this.seriesID,
        season
      );
    } else {
      console.log("how?");
    }
  }

  onClickEpisodes() {
    if (this.Type == "series") {
      this.episodesService.episodesFromSeries(
        this.imdbID,
        this.totalSeasons
      );
    } else if (this.Type == "episode") {
      this.episodesService.episodesFromEpisode(
        this.seriesID,
        this.Season
      );
    }
  }
}
