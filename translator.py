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
    "af": "Afrikaans",
    "ar": "Arabic",
    "bn": "Bengali",
    "bg": "Bulgarian",
    "zh-cn": "Chinese (Simplified)",
    "zh-tw": "Chinese (Traditional)",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "et": "Estonian",
    "fi": "Finnish",
    "fr": "French",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "he": "Hebrew",
    "hi": "Hindi",
    "hu": "Hungarian",
    "is": "Icelandic",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "kn": "Kannada",
    "ko": "Korean",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "ms": "Malay",
    "ml": "Malayalam",
    "mr": "Marathi",
    "ne": "Nepali",
    "no": "Norwegian",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pa": "Punjabi",
    "ro": "Romanian",
    "ru": "Russian",
    "sr": "Serbian",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "es": "Spanish",
    "sw": "Swahili",
    "sv": "Swedish",
    "ta": "Tamil",
    "te": "Telugu",
    "th": "Thai",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "vi": "Vietnamese",
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