import json
import os
import pathlib
import httpx

from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

"""
--By ID or Title--
Parameter	Required	Valid Options	        Default Value	Description
i	        Optional*	                        <empty>         A valid IMDb ID (e.g. tt1285016)
t	        Optional*	                        <empty>	        Movie title to search for.
type	    No	        movie, series, episode	<empty>	        Type of result to return.
y	        No		                            <empty>	        Year of release.
plot	    No	        short, full	            short	        Return short or full plot.
r	        No	        json, xml	            json	        The data type to return.
callback	No		                            <empty>	        JSONP callback name.
v	        No		                            1               API version (reserved for future use).
*Please note while both "i" and "t" are optional at least one argument is required.

--By Search--
Parameter	Required	Valid options	        Default Value	Description
s	        Yes		    <empty>	                                Movie title to search for.
type	    No	        movie, series, episode  <empty>	        Type of result to return.
y	        No		    <empty>	                                Year of release.
r	        No	        json, xml	            json	        The data type to return.
page	    No	        1-100	                1	            Page number to return.
callback	No		                            <empty>	        JSONP callback name.
v	        No		                            1	            API version (reserved for future use).
"""


def load_config():
    with open(
        os.path.join(pathlib.Path(__file__).parent.resolve(), "config.json"), mode="r"
    ) as o:
        return json.load(o)


config = load_config()
base_url = f"{config['url']}/?apikey={config['key']}&v=1&r=json"

app = FastAPI()

origins = ["http://localhost", "http://localhost:80", "http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/t/{t}")
async def read_item(t: str, plot: Optional[str] = "short"):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{base_url}&t={t}&plot={plot}")
        print(r.url)
        return r.json()


@app.get("/i/{i}")
async def read_item(i: str, plot: Optional[str] = "short"):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{base_url}&i={i}&plot={plot}")
        print(r.url)
        return r.json()


@app.get("/s/{s}")
async def read_item(s: str, page: Optional[int] = 1):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{base_url}&s={s}&page={page}")
        print(r.url)
        return r.json()
