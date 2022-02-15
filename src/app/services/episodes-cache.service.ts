import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { SeasonResult } from '../season.result';
import { FilmService } from './film.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodesCacheService {

  constructor(private filmService: FilmService) { }

  private cacheTotalSeasons: Map<string, number> = new Map();
  private cacheSelectedSeason: Map<string, number> = new Map();
  private cacheSeasonResult: Map<string, SeasonResult> = new Map(); // { imdbID: string, seasonNum: number; }

  saveToCache(
    { imdbID, selectedSeason, totalSeasons, seasonResult }
      : { imdbID: string; selectedSeason?: number; totalSeasons?: number; seasonResult?: SeasonResult; }
  ) {
    if (totalSeasons) {
      console.log(`cacheTotalSeasons.set: ${imdbID}), ${totalSeasons}`);
      this.cacheTotalSeasons.set(imdbID, totalSeasons);
    }

    if (selectedSeason) {
      console.log(`cacheSelectedSeason.set: ${imdbID}), ${selectedSeason}`);
      this.cacheSelectedSeason.set(imdbID, selectedSeason);
    }

    if (seasonResult) {
      console.log(`cacheTotalSeasons.set: ${imdbID}), ${seasonResult.totalSeasons}`);
      this.cacheTotalSeasons.set(imdbID, seasonResult.totalSeasons);
      console.log(`cacheSeasonResult.set: ${JSON.stringify({ imdbID: imdbID, seasonNum: seasonResult.Season })}), ${JSON.stringify(seasonResult)}`);
      this.cacheSeasonResult.set(
        JSON.stringify({ imdbID: imdbID, seasonNum: seasonResult.Season }),
        seasonResult
      );
    }

    console.log(
      `cacheTotalSeasons: ${this.cacheTotalSeasons.size},
      cacheSelectedSeason: ${this.cacheSelectedSeason.size},
      cacheSeasonResult: ${this.cacheSeasonResult.size}`
    );
    this.clearCacheIfNeeded();
  }

  private clearCacheIfNeeded() {

  }

  getSelectedSeason(imdbID: string): number {
    console.log(`cacheSelectedSeason(${imdbID}): ${this.cacheSelectedSeason.has(imdbID)}`);
    return this.cacheSelectedSeason.get(imdbID) ?? 0;
  }

  getTotalSeasons(imdbID: string): number | undefined {
    console.log(`getTotalSeasons(${imdbID}): ${this.cacheTotalSeasons.has(imdbID)}`);
    return this.cacheTotalSeasons.get(imdbID);
  }

  getTotalSeasonsObservable(imdbID: string): Observable<number> {
    console.log("getTotalSeasonsObservable");
    return this.getSeasonResultObservable(imdbID, 1).pipe(
      switchMap(result => of(result.totalSeasons))
    );
  }

  getSeasonResult(imdbID: string, seasonNum: number): SeasonResult | undefined {
    const keyString = JSON.stringify({ imdbID: imdbID, seasonNum: seasonNum });
    console.log(`cacheSeasonResult(${imdbID}): ${this.cacheSeasonResult.has(keyString)}`);
    return this.cacheSeasonResult.get(keyString);
  }

  // important side-effect updating cache
  getSeasonResultObservable(imdbID: string, seasonNum: number): Observable<SeasonResult> {
    console.log("getSeasonResultObservable");
    return this.filmService.getSeasonByFilmId({
      imdbID: imdbID, season: seasonNum
    }).pipe(
      tap(result => this.saveToCache(
        { imdbID: imdbID, seasonResult: result }
      ))
    );
  }
}
