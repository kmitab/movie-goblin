import { PluralResponse } from "./plural.response";
import { FilmBrief } from "./plural.response";

export class PluralResult {

    Search: FilmBrief[];
    totalResults: number;
    Response?: boolean;
    totalPages: number;

    constructor(pluralResponse?: PluralResponse) {
        this.Search = pluralResponse ? pluralResponse.Search : [];
        this.totalResults = Number(pluralResponse?.totalResults) || 0;
        this.Response = this.valResponse(pluralResponse?.Response);
        this.totalPages = pluralResponse ? this.getTotalPages(pluralResponse.totalResults) : 0;
    }

    private getTotalPages(numberOfResults: string): number {
        return Math.ceil(Number(numberOfResults) / 10) || 0;
    }

    private valResponse(response: string | undefined) {
        if (!response || response == "False") {
            return false;
        }
        return true;
    }
}