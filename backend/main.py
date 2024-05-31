from fastapi import FastAPI, Request, UploadFile, File
import requests
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import json
import os
from dotenv import load_dotenv
from PyPDF2 import PdfReader
#taking the .env variables and using them for loading into the main file strict

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
UPLOAD_DIRECTORY = "./backend/uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

@app.get("/",response_class=HTMLResponse)
async def read_root():
    with open("frontend/dist/index.html") as f:
        return f.read()
    

@app.post("/upload")
async def upload_pdf(file:UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIRECTORY,file.filename)

    #save the file
    with open(file_location,"wb") as f:
        f.write(file.file.read())

    # Extracting text from the pdf
    reader = PdfReader(file_location)
    text =""
    for page in reader.pages:
        text+=page.extract_text()
    
    return {"filename": file.filename, "message": "File uploaded successfully","extracted_text": text}