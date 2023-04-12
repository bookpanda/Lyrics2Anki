from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from threading import Thread
import json
import genanki
from fugashi import Tagger

app = Flask(__name__)
cors = CORS(app)

fukashitTagger = Tagger()


@cross_origin()
@app.route("/", methods=["POST"])
def index():
    lyrics = request.json
    tokens = set()
    for line in lyrics:
        for word in fukashitTagger(line):
            if word.feature[0] != "助詞":
                tokens.add(word.surface)

    token_list = [tk for tk in tokens]

    data = {"content": token_list}
    json_dump = json.dumps(data)
    res = Response(json_dump)
    res.headers["Content-Type"] = "application/json"
    res.headers["Access-Control-Allow-Origin"] = "*"
    res.headers["Access-Control-Allow-Credentials"] = True
    return res


@app.route("/anki", methods=["POST"])
def index():
    vocab = request.json
    # for v in vocab:

    deckModel = genanki.Model(
        1607392319,
        "Simple Model",
        fields=[
            {"name": "Question"},
            {"name": "Answer"},
        ],
        templates=[
            {
                "name": "Card 1",
                "qfmt": "{{Question}}",
                "afmt": '{{FrontSide}}<hr id="answer">{{Answer}}',
            },
        ],
    )
    return 0


def run():
    app.run(host="0.0.0.0", port=8080)


def keep_alive():
    server = Thread(target=run)
    server.start()


keep_alive()
