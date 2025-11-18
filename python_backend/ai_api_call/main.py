from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class InputData(BaseModel):
    text: str

@app.post("/process")
def process_text(data: InputData):
    return {"result": data.text.upper()}
