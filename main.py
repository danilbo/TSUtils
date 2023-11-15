from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import psutil

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

class InternetInterface:

    def __init__(self, label, sent, recv):
        self.label = label
        self.sent = sent
        self.recv = recv

    def display_info(self):
        print(f"Label: {self.label}")
        print(f"sent: {self.sent}")
        print(f"recv: {self.recv}")


class Data():
    def __init__(self):
        self.cpuLoad = psutil.cpu_percent(interval=1)
        self.memory = psutil.virtual_memory().percent
        self.interfaces = []
        for interface, data in psutil.net_io_counters(pernic=True).items():
            self.interfaces.append(InternetInterface(interface, data.packets_sent, data.packets_recv))

    cpuLoad: float
    memory: float
    interfaces: []


@app.get("/api/v1/getData")
async def getData():

    data = jsonable_encoder(Data())
    return JSONResponse(content=data)

