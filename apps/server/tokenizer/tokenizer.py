# from flask import  Response
import json
from fugashi import Tagger

def lambda_handler(event, context): 
    fukashiTagger = Tagger()
    
    lyrics = event['lyrics']
    tokens = set()
    for line in lyrics:
        for word in fukashiTagger(line):
            if word.feature[0] != "助詞":
                tokens.add(word.surface)

    token_list = [tk for tk in tokens]

    data = {"content": token_list}
    json_dump = json.dumps(data)
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json_dump
    }
    # res = Response(json_dump)
    # res.headers["Content-Type"] = "application/json"
    # res.headers["Access-Control-Allow-Origin"] = "*"
    # res.headers["Access-Control-Allow-Credentials"] = True
    # return res