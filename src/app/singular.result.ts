import { SingularResponse } from "./singular.reponse";

export class SingularResult {

    imdbID?: string;
    seriesID?: string;
    Actors?: string;
    Awards?: string;
    BoxOffice?: string;
    Country?: string;
    DVD?: string;
    Director?: string;
    Genre?: string;
    Language?: string;
    Plot?: string;
    Poster?: string;
    Production?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Title?: string;
    Type?: string;
    Website?: string;
    Writer?: string;
    Year?: string;
    Metascore?: number;
    Season?: number;
    totalSeasons?: number;
    imdbRating?: number;
    imdbVotes?: number;
    Response?: boolean;
    Ratings?: { Source: string, Value: string; }[];

    constructor(singularResponse?: SingularResponse) {
        if (singularResponse) this.updateValues(singularResponse);
    }

    private updateValues(response: SingularResponse) {

        // string
        this.imdbID = response.imdbID;
        this.seriesID = this.valSeriesID(response.seriesID);
        this.Actors = response.Actors;
        this.Awards = response.Awards;
        this.BoxOffice = response.BoxOffice;
        this.Country = response.Country;
        this.DVD = response.DVD;
        this.Director = response.Director;
        this.Genre = response.Genre;
        this.Language = response.Language;
        this.Plot = response.Plot;
        this.Poster = response.Poster;
        this.Production = response.Production;
        this.Rated = response.Rated;
        this.Released = response.Released;
        this.Runtime = response.Runtime;
        this.Title = response.Title;
        this.Type = response.Type;
        this.Website = response.Website;
        this.Writer = response.Writer;
        this.Year = response.Year;

        // number
        this.Metascore = Number(response.Metascore) || undefined;
        this.Season = Number(response.Season) || undefined;
        this.totalSeasons = Number(response.totalSeasons) || undefined;
        this.imdbRating = Number(response.imdbRating) || undefined;
        this.imdbVotes = this.valVotes(response.imdbVotes);

        // boolean
        this.Response = this.valResponse(response.Response);

        // arrays
        this.Ratings = response.Ratings;

        Object.keys(this)
            .filter(key => (this[key as keyof SingularResult] == "N/A"))
            .forEach(key => {
                this[key as keyof SingularResult] = undefined;
            });
    }

    private valSeriesID(seriesID: string | undefined) {
        if (!seriesID) {
            return seriesID;
        }
        if (!seriesID.startsWith("tt")) {
            return `t${seriesID}`;
        }
        return seriesID;
    }

    private valResponse(response: string | undefined) {
        if (!response || response == "False") {
            return false;
        }
        return true;
    }

    private valVotes(votes: string | undefined) {
        if (!votes) {
            return undefined;
        }
        return Number(votes.split(",").join(""));
    }
}