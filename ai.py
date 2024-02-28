import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# sets up Flask and OpenAI API
app = Flask(__name__)
CORS(app)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
completion = ''
data = ''

# def generate_response():
#   completion = client.chat.completions.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "system", "content": '''
#      You are an assitant that is proficient in creating schedules with times that a user provides. 
#      You must adhere to these rules when responding
#      1) You only respond with the days of the week with the times you suggest scheduling. 
#      2) You should follow this format: Monday: Reading 1pm - 2pm, Gaming 2pm - 3pm, Coding 5am - 7am
#      3) Following the previous rule, you need to include event name following the time it will be scheduled/take place
#      '''},
#     {"role": "user", "content": "Make me a schedule form M-F that has 1 hour of reading and 2 hours of programming"}
#   ],
#   max_tokens=50
#   )
#   return completion.choices[0].message.content;

# sets up the Flask route to pass the generated response to the JS file
# chatgpt system given specific instructions to generate the response about schedules including
# how to respond which will be used for processing for the Google calender to take in
# will need to update the user portion to include the user input
# @app.route("/get_message")
# def get_message():
#   completion = client.chat.completions.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "system", "content": '''
#      You are an assitant that is proficient in creating schedules with times that a user provides. 
#      You must adhere to these rules when responding
#      1) You only respond with the days of the week with the times you suggest scheduling. 
#      2) You should follow this format: Monday: Reading 1pm - 2pm, Gaming 2pm - 3pm, Coding 5am - 7am
#      3) Following the previous rule, you need to include event name following the time it will be scheduled/take place
#      '''},
#     {"role": "user", "content": data}
#   ],
#   max_tokens=50
#   )
#   return {"message": [completion.choices[0].message.content]}

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