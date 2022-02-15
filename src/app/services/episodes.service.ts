import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

import { EpisodesCacheService } from './episodes-cache.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private episodesCacheService: EpisodesCacheService) { }

  seasons = new BehaviorSubject<
    { imdbID: string; selectedSeason: number; totalSeasons: number | Observable<number>; }
  >({ imdbID: "", selectedSeason: 0, totalSeasons: 0 });
  seasons$ = this.seasons.pipe(
    tap(params => console.log(`navigationMenu$: ${JSON.stringify(params)}`)),
    switchMap(params => {
      if (params.totalSeasons instanceof Observable) {
        return params.totalSeasons.pipe(
          switchMap(totalSeasons => of({
            imdbID: params.imdbID,
            selectedSeason: params.selectedSeason,
            seasonNumArray: this.getSeasonNumArray(totalSeasons)
          }))
        );
      } else {
        return of({
          imdbID: params.imdbID,
          selectedSeason: params.selectedSeason,
          seasonNumArray: this.getSeasonNumArray(params.totalSeasons as number)
        });
      }
    })
  );

  episodes = new BehaviorSubject<{ imdbID: string, selectedSeason: number; }>({ imdbID: "", selectedSeason: 0 });
  episodes$ = this.episodes.pipe(
    tap(params => console.log(`selectedSeason$: ${JSON.stringify(params)}`)),
    switchMap(params => {
      let cachedResult = this.episodesCacheService.getSeasonResult(params.imdbID, params.selectedSeason);
      if (!cachedResult) {
        return this.episodesCacheService.getSeasonResultObservable(params.imdbID, params.selectedSeason);
      } else {
        return of(cachedResult);
      }
    })
  );

  seasonsFromSeries(imdbID: string, totalSeasons: number) {
    console.log(`seasonsFromSeries`);

    this.episodesCacheService.saveToCache({ imdbID: imdbID, totalSeasons: totalSeasons });
    const selectedSeason = this.episodesCacheService.getSelectedSeason(imdbID);
    this.seasons.next({ imdbID: imdbID, selectedSeason: selectedSeason, totalSeasons: totalSeasons });
  }

  episodesFromSeries(imdbID: string, totalSeasons: number) {
    console.log(`episodesFromSeries`);

    this.episodesCacheService.saveToCache({ imdbID: imdbID, totalSeasons: totalSeasons });
    let selectedSeason = this.episodesCacheService.getSelectedSeason(imdbID) || 1;
    this.episodes.next({ imdbID: imdbID, selectedSeason: selectedSeason });
  }

  seasonsFromEpisode(imdbID: string, season: number) {
    console.log(`seasonsFromEpisode`);

    this.episodesCacheService.saveToCache({ imdbID: imdbID, selectedSeason: season });
    const selectedSeason = this.episodesCacheService.getSelectedSeason(imdbID);
    const totalSeasons = this.episodesCacheService.getTotalSeasons(imdbID) ?? this.episodesCacheService.getTotalSeasonsObservable(imdbID);
    this.seasons.next({ imdbID: imdbID, selectedSeason: selectedSeason || season, totalSeasons: totalSeasons });
  }

  episodesFromEpisode(imdbID: string, season: number) {
    console.log(`episodesFromEpisode`);

    this.episodesCacheService.saveToCache({ imdbID: imdbID, selectedSeason: season });
    this.episodes.next({ imdbID: imdbID, selectedSeason: season });
  }

  changeSeason(imdbID: string, season: number) {
    console.log(`changeSeason imdbID: ${imdbID}, season:${season}`);

    this.episodesFromEpisode(imdbID, season);
  }

  private getSeasonNumArray(totalSeasons: number) {
    return Array.from({ length: totalSeasons ?? 0 }, (_, i) => i + 1);
  }
}
