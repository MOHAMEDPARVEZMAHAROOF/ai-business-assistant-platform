.PHONY: backend frontend test db-up db-down

backend:
	cd backend && uvicorn app.main:app --reload --port 8000

frontend:
	cd frontend && npm run dev

test:
	cd backend && pytest

db-up:
	docker compose up -d db

db-down:
	docker compose down
