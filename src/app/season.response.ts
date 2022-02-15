export interface Episode {
    Title: string;
    Released: string;
    Episode: string;
    imdbRating: string;
    imdbID: string;
}

export interface SeasonResponse {
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: Episode[];
    Response: string;
}