# sous Developer Guide

## Backend Setup

The backend handles the data pipeline, AI agent, and API endpoints.

### 1. Start the Server
Open a terminal and run:
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```
The server will start at `http://localhost:8000`.
- API Docs: `http://localhost:8000/docs`

### 2. Run Verification Tests
Open a **new** terminal window (keep the server running) and run:
```bash
cd backend
source venv/bin/activate
python tests/verify.py
```

## Frontend Setup

The frontend is a React application powered by Vite.

### 1. Install Dependencies
```bash
# From the project root
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Troubleshooting

- **Connection Refused**: Ensure the backend server is running before running `verify.py` or using the frontend.
- **OpenAI Key**: Make sure your `OPENAI_API_KEY` is set in `backend/.env` for the Chat feature to work.
