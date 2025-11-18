# from http.server import BaseHTTPRequestHandler
import json
# import google.generativeai as genai
from google import genai
import os
import traceback
from vercel import Request


GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
print("GEMINI_API_KEY:", GEMINI_API_KEY)
client = genai.Client(api_key=GEMINI_API_KEY)
def handler(request):
    print("Handler invoked")
    try:
        data = request.json()
        topic = data.get("topic", "")
        prompt = (
            f"Please give me a single verse scripture reference and its text "
            f"from either the Old Testament, New Testament, Book of Mormon, "
            f"or Doctrine and Covenants about the topic: {topic}."
        )
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        scripture = response.text
        return {"status": 200,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"scripture": scripture})
                }
    except Exception as e:
        print("ERROR:", traceback.format_exc())
        return {
            "status": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
            }