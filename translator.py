from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from translate import Translator

app = FastAPI()

# Define the expected request body from Spring Boot
class TranslationRequest(BaseModel):
    text: str
    target_lang: str  # e.g., "es", "fr", "de"

# Define the dictionary for validation (optional but recommended)
LANGUAGES = {
    'ar': 'Arabic', 'bn': 'Bengali', 'zh-cn': 'Chinese (Simplified)',
    'en': 'English', 'fr': 'French', 'de': 'German', 'hi': 'Hindi',
    'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean',
    'es': 'Spanish', 'sv': 'Swedish'
}

@app.post("/translate")
async def translate_text(request: TranslationRequest):
    # Validate language code
    if request.target_lang not in LANGUAGES:
        raise HTTPException(status_code=400, detail="Unsupported language code.")

    try:
        translator = Translator(to_lang=request.target_lang)
        translation = translator.translate(request.text)
        
        # Return a clean JSON response
        return {
            "original_text": request.text,
            "translated_text": translation,
            "language_name": LANGUAGES[request.target_lang],
            "language_code": request.target_lang
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)