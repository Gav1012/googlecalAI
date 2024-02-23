import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

# sets up Flask and OpenAI API
app = Flask(__name__)
CORS(app)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# will need to add user input to updated the user input
def generate_response():
  completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": '''
     You are an assitant that is proficient in creating schedules with times that a user provides. 
     You must adhere to these rules when responding
     1) You only respond with the days of the week with the times you suggest scheduling. 
     2) You should follow this format: Monday: Reading 1pm - 2pm, Gaming 2pm - 3pm, Coding 5am - 7am
     3) Following the previous rule, you need to include event name following the time it will be scheduled/take place
     '''},
    {"role": "user", "content": "Make me a schedule form M-F that has 1 hour of reading and 2 hours of programming"}
  ],
  max_tokens=50
  )
  return completion.choices[0].message.content;

# sets up the Flask route to pass the generated response to the JS file
@app.route("/get_message")
def get_message():
  return {"message": [generate_response()]}

if __name__ == '__main__':
  app.run(debug=True)