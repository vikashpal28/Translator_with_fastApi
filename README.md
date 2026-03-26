# Translator_with_fastApi

FastAPI-based translation service with pluggable providers (DeepL, OpenAI, etc.)  
Includes quiz & chat modules and optional Spring Boot backend.

## Project structure

- `app.py` / `main.py`: FastAPI application and endpoints
- `translator.py` / `services/translate.py`: translation logic and provider adapters
- `config.py`: environment config for API keys and defaults
- `quiz.py` / `services/quiz.py`: quiz questions, scoring, and progress
- `chat.py` / `services/chat.py`: chat session handling and responses
- `requirements.txt`
- `.env` (local secrets, not committed)
- `tests/`: pytest unit tests
- `backend-spring/`: optional Spring Boot backend
- `README.md`

## Requirements

- Python 3.11+
- FastAPI
- Uvicorn
- httpx
- pydantic
- python-dotenv (optional)
- Java 17+ / Maven or Gradle for Spring Boot backend

## Setup

1. Clone repo:
   - `git clone <repo-url>`
   - `cd Translator_with_fastApi`
2. Virtual environment:
   - `python -m venv .venv`
   - `source .venv/bin/activate`
3. Install dependencies:
   - `pip install -r requirements.txt`
4. Create `.env` with keys:
   - `DEEPL_API_KEY=...`
   - `OPENAI_API_KEY=...`
   - `DEFAULT_SOURCE_LANGUAGE=en`
   - `DEFAULT_TARGET_LANGUAGE=es`
5. Run Python app:
   - `uvicorn app:app --reload` (or `uvicorn main:app --reload`)
6. Run Spring Boot backend (if used):
   - `cd backend-spring`
   - `./mvnw spring-boot:run` or `./gradlew bootRun`

## API

- `GET /health` or `/ping` - health check
- `POST /translate`
  - request: `{"source_language":"en","target_language":"es","text":"Hello"}`
  - response: `{"translated_text":"Hola"}`
- `POST /batch_translate`
  - request: list of text items
  - response: list of translations
- `POST /quiz/start` (or similar)
  - start quiz session
- `POST /quiz/answer`
  - submit answer, get next question and score update
- `GET /quiz/result`
  - final score and summary
- `POST /chat`
  - user messages to chat endpoint, returns bot response
- `GET /chat/history`
  - retrieve session history

## Example (translate)

```bash
curl -X POST "http://127.0.0.1:8000/translate" \
  -H "Content-Type: application/json" \
  -d '{"source_language":"en","target_language":"fr","text":"Hello"}'