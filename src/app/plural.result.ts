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

    public getSearchArray(): FilmBrief[] {
        return (!this.pluralResponse || this.pluralResponse.Response == "False")
            ? [] : this.pluralResponse.Search;
    }
}