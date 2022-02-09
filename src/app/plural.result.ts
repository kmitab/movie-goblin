import { PluralResponse } from "./plural.response";
import { FilmBrief } from "./plural.response";

export class PluralResult {

    private pluralResponse?: PluralResponse;

    constructor(pluralRequest?: PluralResponse) {
        this.pluralResponse = pluralRequest;
    }

    public hasValues(): boolean {
        if (this.pluralResponse &&
            this.pluralResponse.Response == "True" &&
            this.pluralResponse.Search.length > 0)
            return true;
        return false;
    }

    public getNumberOfPages(): number {
        if (this.hasValues()) {
            return Math.ceil(Number(this.pluralResponse?.totalResults) / 10);
        }
        return 0;
    }

    public getSearchArray(): FilmBrief[] {
        return (!this.pluralResponse || this.pluralResponse.Response == "False")
            ? [] : this.pluralResponse.Search;
    }
}