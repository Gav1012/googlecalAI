import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ],
  max_tokens=50
)

print(completion.choices[0].message.content);

@app.route("/get_message")
def get_message():
  # message = "Hello from ai.py"
  # return jsonify({'response':  completion.choices[0].message})
  return {"message": [completion.choices[0].message.content]}

if __name__ == '__main__':
  app.run(debug=True)