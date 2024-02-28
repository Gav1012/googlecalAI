import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

# sets up Flask and OpenAI API
app = Flask(__name__)
CORS(app)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# sets default to be empty
completion = ''
data = ''

# this route is for the user sending their inputs from the text area to the processed by chatgpt
@app.route("/send_input", methods=["POST"])
def send_input():
  data = request.json.get("data")
  print(f"Recieved data: {data}")
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
    {"role": "user", "content": data}
  ],
  max_tokens=50
  )
  print (completion.choices[0].message.content)
  return {"message": [completion.choices[0].message.content]}

if __name__ == '__main__':
  app.run(debug=True)