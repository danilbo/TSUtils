from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import random

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

class Data():
    def __init__(self):
        self.number = random.uniform(10.5, 75.5)

    number: float


@app.get("/api/v1/number")
async def getData():
    data = jsonable_encoder(Data())
    return JSONResponse(content=data)