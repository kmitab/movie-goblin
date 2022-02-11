import { PluralResponse } from "./plural.response";
import { FilmBrief } from "./plural.response";

export class PluralResult implements PluralResponse {

    Search: FilmBrief[];
    totalResults: string;
    Response: string;
    totalPages: number;

    constructor(pluralRequest?: PluralResponse) {
        this.Search = pluralRequest ? pluralRequest.Search : [];
        this.totalResults = pluralRequest ? pluralRequest.totalResults : "0";
        this.Response = pluralRequest ? pluralRequest.Response : "...";
        this.totalPages = pluralRequest ? this.getTotalPages(pluralRequest.totalResults) : 0;
    }

    private getTotalPages(numberOfResults: string): number {
        return Math.ceil(Number(numberOfResults) / 10) || 0;
    }
}