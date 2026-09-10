# Architecture

## First vertical slice

The first release keeps the boundaries explicit:

1. The React client owns navigation, upload affordances, chat presentation, and source citation UI.
2. FastAPI owns authentication, file validation, document jobs, retrieval, chat orchestration, and API contracts.
3. PostgreSQL owns users, documents, chunks, conversations, messages, and retrieval metadata.
4. Object storage owns original uploads; the database stores metadata and processing state.
5. The LLM is called only by the backend so provider credentials never reach the browser.

## Document-to-answer flow

```text
PDF upload
  -> validate type and size
  -> store original in object storage
  -> enqueue processing job
  -> extract text
  -> split into overlapping chunks
  -> create embeddings
  -> persist chunks and vectors

Question
  -> authenticate user
  -> embed question
  -> retrieve the closest authorized chunks
  -> compose a grounded prompt
  -> generate answer
  -> return answer + source references
  -> persist conversation turn
```

## Quality bar

- Every answer should carry enough source information for a user to verify it.
- A document must never be retrieved across user or workspace boundaries.
- Upload and chat operations should expose useful processing states instead of hanging.
- Provider calls belong behind small interfaces so a model or vector store can be swapped without rewriting the API.
