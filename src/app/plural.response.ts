export interface FilmBrief {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string;
}

export interface PluralResponse {
    Search: FilmBrief[],
    totalResults: string,
    Response: string;
}