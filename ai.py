import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_response():
  completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are an assistant that is knowledgable when it comes to making schedules for people. You only respond with the days and times of events"},
    {"role": "user", "content": "Make me a schedule form M-F that has 1 hour of reading and 2 hours of programming"}
  ],
  max_tokens=50
  )
  return completion.choices[0].message.content;

@app.route("/get_message")
def get_message():
  return {"message": [generate_response()]}

if __name__ == '__main__':
  app.run(debug=True)