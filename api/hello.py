import json

def handler(request):
    return {"status": 200, 
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "Hello world"})
    }
