<img width="790" alt="image" src="https://github.com/abhay-raj19/Ai-Planet-assignment/assets/96302417/0ae74bd8-b3a5-4511-bfab-6607aab5dd96">




# PDFChat Interface Application

This project is a simple PDFchat interface application built using FastAPI and React. It allows users to upload up a pdf file and then ask questions, and the system provides answers in a chat-like manner.

## Features

- Users can input questions in a text field.
- The system provides answers to the questions in a chat-like interface.
- Answers are displayed gradually to simulate a conversation.
- Avatars are displayed for both user questions and system answers.
- Custom favicon using the project logo is displayed in the browser tab.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Axios: Promise-based HTTP client for making AJAX requests.
- FAstAPI: Creating up the Backend code and integrating LLM with it.
- OpenAI: for using up the openAI embeddings models and Faiss model for semanitic search.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhay-raj19/Ai-Planet-assignment.git

2. Setting up a virtual environment for the backend:
   ```bash
   python -m venv myvenv
   
3. Activate up that environment:
    ```bash
   source venv/Scripts/activate
    
3. Installing dependencies for backend code :
    ```bash
   pip install -r requirements.txt

4. Build up the the Frontend Part
    ```bash
   cd frontend
   npm install
   npm run build

5. Testing it out locally  
    ```bash
   cd .. (come to root dir)
   uvicorn backend.main:app --reload
  
6. This will run up the project locally to the 
   ```bash
   http://localhost:8000
   OR 
   http://127.0.0.1:8000

   Happy Coding 💙 ...
