from flask import Flask, request, jsonify
import requests
import json
import dialogflow_v2 as dialogflow
import uuid
import subprocess
import pymongo

app = Flask(__name__)
project_id = "hacked2020-dialogflow"
process_id = subprocess.run(['gcloud', 'auth', 'application-default', 'print-access-token'], stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]
common_headers = {'Content-Type': 'application/json', 'Accept-Charset': 'UTF-8', 'Authorization' : 'Bearer ' + process_id}

# mongo con
client = pymongo.MongoClient("y")
db = client.test
recipe_col = db['recipes']
grocery_col = db['groceries']



def handle_text_input(text):
    # ask diaalogflow and get the keywords matching.
    session_id = str(uuid.uuid4())
    url = "https://dialogflow.googleapis.com/v2/projects/" + project_id + "/agent/sessions/" + session_id + ":detectIntent"
    payload = {
        "query_input": {
            "text": {
                  "text": text,
                  "language_code": "en-US"
            }
        }
    }

    r = requests.post(url, data=str(payload), headers=common_headers)
    print("got from df: ", r)
    return r.json()

def get_filter_params(data):
    print("getting flags from: ", data)
    params = data["queryResult"]["parameters"]
    res = {}
    for [key, val] in params.items():
        if len(val) > 0:
            res[key] = val
    return res

@app.route('/')
def hello_world():
    return 'Hello world'


@app.route('/text', methods=['POST'])
def send_dialogflow_request():
    data = request.get_json()
    print(data, type(data))
    dialogflow_res = handle_text_input(data["text"])

    dialogflow_params = get_filter_params(dialogflow_res)
    flags = dialogflow_params.keys()
    
    query_params = {
        "score": {"$exists" : True},
    }

    
    #recipe_col
    #    .find(query_params)
    #    .sort({
    #        "score": -1
    #        })
    # if simple: grab instru less than 7, ingre < 8
    # if complex: instru >= 9, ingre >= 9

    # if expensive : > 10$
    # else

    # place 

    # price range: see unit price then look for less or more


    print("flags: ", flags)

    return jsonify(dialogflow_res)
