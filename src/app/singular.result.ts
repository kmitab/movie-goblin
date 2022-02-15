import { SingularResponse } from "./singular.reponse";

export class SingularResult implements SingularResponse {

    private loading: string = "...";
    Actors = this.loading;
    Awards = this.loading;
    BoxOffice = this.loading;
    Country = this.loading;
    DVD = this.loading;
    Director = this.loading;
    Genre = this.loading;
    Language = this.loading;
    Metascore = this.loading;
    Plot = this.loading;
    Poster = this.loading;
    Production = this.loading;
    Rated = this.loading;
    Ratings = [{ Source: this.loading, Value: this.loading }];
    Released = this.loading;
    Response = this.loading;
    Runtime = this.loading;
    Title = this.loading;
    Type = this.loading;
    Website = this.loading;
    Writer = this.loading;
    Year = this.loading;
    imdbID = this.loading;
    imdbRating = this.loading;
    imdbVotes = this.loading;
    totalSeasons = this.loading;
    seriesID = this.loading;
    Season = this.loading;

    constructor(singularResponse?: SingularResponse) {
        if (singularResponse) this.updateValues(singularResponse);
    }

    private updateValues(values: SingularResponse): void {
        Object.keys(this)
            .forEach(key => {
                let newValue = values[key as keyof SingularResponse]; // incoming value
                if (typeof newValue == "string") {
                    this[key as keyof SingularResult] = (newValue == "N/A" ? "" : newValue) as any;
                    // newValue || "?" as any;
                } else if (newValue instanceof Array) {
                    this[key as keyof SingularResult] = newValue as any;
                }
            });
    }

    public getRatings(): string {
        if (this.Ratings.length == 0) return "no ratings";
        let result = "";
        for (let i = 0; i < this.Ratings.length; i++) {
            result = result.concat(`${this.Ratings[i].Source}: ${this.Ratings[i].Value}`);
            if (i < this.Ratings.length - 1) {
                result = result.concat(", ");
            }
        }
        return result;
    }
}