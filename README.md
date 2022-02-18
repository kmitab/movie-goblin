## omdb-g

I started this project to help me learn the following:

- Angular
- TypeScript
- **RxJS**
- Bootstrap

The data source for this frontend is the excellent [omdb api](https://www.omdbapi.com/).

## demo

Coming soon (hopefully).

## backend

Fastapi-based python backend (such as it is) resides in `/_backend`. It's only real purpose is to not expose the api key to the frontend.

Naturally, you need to obtain your own omdb api key if you want to play around with this project.

## config files

- `/_backend/config.json`- for api credentials and allowed origins:
```
{
    "key": "xxxyyy123",
    "url": "http://www.omdbapi.com",
    "origins": [
        "http://localhost:4200",
        "http://192.168.1.5:4200"
    ]
}
```

- `/src/api.ts` - for the backend url:
```
export const apiUrl = "http://192.168.1.5:8000";
```