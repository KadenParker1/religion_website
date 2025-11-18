# from http.server import BaseHTTPRequestHandler
import json
# import google.generativeai as genai
from google import genai
import os


topic = "chastity"
client = genai.Client(api_key=GEMINI_API_KEY)

def handler(req, res):
    try:
        data = req.json()
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
        res.status_code = 200
        return {"scripture": scripture}
    except Exception as e:
        res.status_code = 500
        return {"error": str(e)}



response = client.models.generate_content(
    model="gemini-2.5-flash", contents=f"Please give me a single verse scripture reference from either Old Testament, New Testament, Book of Mormon, or Doctrine and Covenants and text for that scripture about the topic: {topic}"
)
print(response.text)