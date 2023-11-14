from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import random
import psutil

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

class InternetInterface:
    def __init__(self, name, value1, value2):
        self.name = name
        self.value1 = value1
        self.value2 = value2

    def display_info(self):
        print(f"Name: {self.name}")
        print(f"Value 1: {self.value1}")
        print(f"Value 2: {self.value2}")

class Data():
    def __init__(self):
        self.cpuLoad = psutil.cpu_percent(interval=5)
        self.memory = psutil.virtual_memory().percent
        # for interface, data in psutil.net_io_counters(pernic=True).items():
        #     self.packets.
        #     print(f"Interface: {interface}")
        #     print(f"    Packets Sent: {data.packets_sent}")
        #     print(f"    Packets Received: {data.packets_recv}")

    cpuLoad: float
    memory: float
    packets: ()


@app.get("/api/v1/getData")
async def getData():

    # memory usage

    # memory = psutil.virtual_memory()
    # print(f"Total Memory: {memory.total / (1024 ** 3)} GB")
    # print(f"Available Memory: {memory.available / (1024 ** 3)} GB")
    # print(f"Used Memory: {memory.used / (1024 ** 3)} GB")
    # print(f"Memory Usage Percentage: {memory.percent}%")


    # internet usage

    # net_io = psutil.net_io_counters(pernic=True)
    # for interface, data in net_io.items():
    #     print(f"Interface: {interface}")
    #     print(f"    Packets Sent: {data.packets_sent}")
    #     print(f"    Packets Received: {data.packets_recv}")

    data = jsonable_encoder(Data())
    return JSONResponse(content=data)
