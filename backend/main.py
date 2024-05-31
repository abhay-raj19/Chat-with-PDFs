from fastapi import FastAPI
from dotenv import load_dotenv
#taking the .env variables and using them for loading into the main file strict
app = FastAPI()

@app.get("/")
def read_root():
    return {
        "hello":"world"
    }