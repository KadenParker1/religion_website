import json
from google import genai
import os
import traceback
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            # Read body
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)

            topic = data.get("topic", "")

            # Gemini API
            GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
            client = genai.Client(api_key=GEMINI_API_KEY)

            prompt = (
                f"Please give me a single verse scripture reference and its text "
                f"from either the Old Testament, New Testament, Book of Mormon, "
                f"or Doctrine and Covenants about the topic: {topic}."
            )

            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt
            )

            scripture = response.text

            # Send response
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"scripture": scripture}).encode("utf-8"))

        except Exception as e:
            print("ERROR:", traceback.format_exc())
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))