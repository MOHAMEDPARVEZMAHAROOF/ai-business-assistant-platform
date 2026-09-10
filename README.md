# AI Business Assistant Platform

An AI-powered workspace for uploading business documents, asking grounded questions, and keeping a searchable conversation history.

This repository is the first production-oriented project in the AI Engineer / Forward Deployed Engineer job sprint. It deliberately starts with a small, testable vertical slice: a React client, a typed FastAPI service, and PostgreSQL running through Docker Compose.

## Current slice

- FastAPI service with health and service metadata endpoints
- React + TypeScript client with a focused assistant workspace shell
- PostgreSQL service ready for document, conversation, and retrieval data
- Environment-based configuration with no secrets committed
- Test and CI scaffolding
- Architecture notes that make the next implementation steps explicit

## Architecture

```text
React + TypeScript
        |
        v
FastAPI API  ----->  PostgreSQL
        |
        +-----------> document pipeline
                          |
                          +--> text extraction
                          +--> chunking
                          +--> embeddings / vector search
                          +--> grounded LLM response
```

See [docs/architecture.md](docs/architecture.md) for the planned data flow and milestones.

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API is available at `http://localhost:8000`. Interactive API docs are at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The web client is available at `http://localhost:5173`.

### PostgreSQL

```bash
cp .env.example .env
docker compose up -d db
```

## Test

```bash
cd backend
pip install -r requirements.txt
pytest
```

## Roadmap

1. Add persistence models and migrations for users, documents, chunks, conversations, and messages.
2. Add authenticated PDF upload and background document processing.
3. Add embeddings and retrieval with PostgreSQL `pgvector`.
4. Add grounded chat with source citations and conversation history.
5. Deploy the API, web client, database, and object storage with documented environment variables.

## Why this project

The goal is not to demonstrate isolated Python syntax. The goal is to show that I can design, build, test, and deploy an AI-powered backend product with a useful user workflow.
