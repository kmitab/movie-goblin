import { SeasonResponse } from "./season.response";
import { Episode } from "./season.response";

export class SeasonResult {

    Response: string;
    Title: string;
    Season: number;
    totalSeasons: number;
    Episodes: Episode[];

    constructor(seasonResponse?: SeasonResponse) {
        this.Title = seasonResponse ? seasonResponse.Title : "...";
        this.Season = seasonResponse ? Number(seasonResponse.Season) || 0 : 0;
        this.totalSeasons = seasonResponse ? Number(seasonResponse.totalSeasons) || 0 : 0;
        this.Episodes = seasonResponse ? seasonResponse.Episodes : [];
        this.Response = seasonResponse ? seasonResponse.Response : "...";
    }
}