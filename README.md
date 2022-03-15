## movie-goblin

I started this project to help me learn the following:

- Angular
- TypeScript
- **RxJS**
- Bootstrap

The data source for this frontend is the excellent [omdb api](https://www.omdbapi.com/).

- **Note**: I am not affiliated with omdb, imdb or any other such websites.
- **Note**: this project (movie-goblin) is educational in nature and not business-oriented in any way.

## demo

Coming soon.

## backend

Fastapi-based python backend (such as it is) resides in `/_backend`. Its only real purpose is to not expose the api key to the frontend.

Naturally, you need to obtain your own omdb api key if you want to play around with this project.

## config files

- `/_backend/config.json` - for api credentials and allowed origins, example:

```
{
    "verbose": false,
    "key": "xxxyyy123",
    "url": "http://www.omdbapi.com",
    "origins": [
        "http://localhost:4200",
        "http://192.168.1.5"
    ]
}
```

- `/src/environments/environment.ts` - the api url is defined here
- `/src/environments/environment.prod.ts` - the api url is defined here (production)
