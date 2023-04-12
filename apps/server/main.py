from flask import Flask, request, Response, send_file, send_from_directory
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
def anki():
    data = request.json
    title = data["title"]
    vocab = data["vocab"]

    lyricsModel = genanki.Model(
        1607392319,
        title,
        fields=[
            {"name": "Expression"},
            {"name": "Reading"},
            {"name": "Meaning"},
        ],
        templates=[
            {
                "name": "Recognition",
                "qfmt": "{{furigana:Reading}}",
                "afmt": '{{FrontSide}}<hr id="answer">{{Meaning}}',
            },
            {
                "name": "Recall",
                "qfmt": "{{Meaning}}",
                "afmt": '{{FrontSide}}<hr id="answer">{{furigana:Reading}}',
            },
        ],
        css=""".card {
                font-family: helvetica;
                font-size: 28px;
                text-align: center;
                color: black;
                background-color: white;
            }""",
    )
    lyricsDeck = genanki.Deck(2059400110, title)
    for v in vocab:
        if v["furigana"] == "":
            reading = v["token"]
        else:
            reading = f'{v["token"]}[{v["furigana"]}]'
        note = genanki.Note(
            model=lyricsModel, fields=[v["token"], reading, v["translation"]]
        )
        print(v["token"], v["furigana"], v["translation"])
        lyricsDeck.add_note(note)

    genanki.Package(lyricsDeck).write_to_file("output.apkg")

    try:
        return send_file("output.apkg")
    except Exception as e:
        return str(e)


def run():
    app.run(host="0.0.0.0", port=8080)


def keep_alive():
    server = Thread(target=run)
    server.start()


keep_alive()
