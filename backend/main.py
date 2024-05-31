from fastapi import FastAPI, Request, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
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

knowledge_base = None
class QuestionRequest(BaseModel):
    question: str    

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

    # split it into the chunks 

    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,  #1000 charachters and so on
        chunk_overlap=100,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    # print(chunks)

    # Creating embeddings out of those chunks

    
    embeddings = OpenAIEmbeddings()
    global knowledge_base
    knowledge_base = FAISS.from_texts(chunks,embeddings)
    
    return {"filename": file.filename, "message": "File uploaded successfully","extracted_text": text,"chunks":chunks}

#for asking up the question with that specific PDF

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    if knowledge_base is None:
        raise HTTPException(status_code=400, detail="No knowledge base available")
    if(request.question):
        query = request.question
        docs = knowledge_base.similarity_search(query)
        llm = OpenAI()
        chain = load_qa_chain(llm,chain_type="stuff")
        res = chain.run(input_documents=docs,question=query)    

    return {"answer":res}