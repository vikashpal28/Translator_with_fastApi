from flask import Flask, request, jsonify, render_template
from groq import Groq

# 1. Get your FREE key at https://console.groq.com/keys
client = Groq(api_key="xai-1GDo1CZAUiGBxh15m2dUGD6DFIs6EshoBtasuZ6Juto6oycFBUvCPXHeSdKDDEr39dyoL07qNSVXKr61")

app = Flask(__name__)

# 2. Optimized Prompt Variable
SYSTEM_PROMPT = """
You are an Expert English Language Coach. Your goal is to help the user improve their English through active conversation.

For every message the user sends, you must:
1. **Correction**: Identify any grammatical, spelling, or punctuation errors. Provide the corrected version.
2. **Chat**: Respond to the user's message in a friendly, natural way to keep the conversation going.
3. **Refinement**: Suggest 2-3 alternative ways to say the same thing (e.g., a more formal version or a more casual/native-sounding version).
4. **Evaluation**: End your response with a clear 'Grammar Score: [0-100]' based on the user's message accuracy.

Example Format:
Your response here...
---
Grammar Score: 85
"""

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_msg = data.get("message")

        if not user_msg:
            return jsonify({"reply": "Type something!", "score": 0})

        # 3. Groq API Call (Using Llama 3 model)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_msg}
            ],
            temperature=0.7
        )

        full_text = completion.choices[0].message.content

        # 4. Extracting Score from the AI response
        if "Grammar Score:" in full_text:
            parts = full_text.split("Grammar Score:")
            reply_part = parts[0].strip()
            score_part = ''.join(filter(str.isdigit, parts[1]))
        else:
            reply_part = full_text
            score_part = "100"

        return jsonify({
            "reply": reply_part,
            "score": int(score_part) if score_part else 100
        })

    except Exception as e:
        print("GROQ ERROR:", e)
        return jsonify({
            "reply": "Connection error to Groq AI.",
            "score": 0
        })

if __name__ == "__main__":
    app.run(debug=True)