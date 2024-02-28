import base64

import genanki


def lambda_handler(event, context):
    data = event["data"]
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

    genanki.Package(lyricsDeck).write_to_file("/tmp/output.apkg")

    try:
        with open("/tmp/output.apkg", "rb") as input_file:
            file_content = input_file.read()

            base64_content = base64.b64encode(file_content)
            return {
                "statusCode": 200,
                "body": base64_content.decode("utf-8"),
                "isBase64Encoded": True,
            }
    except Exception as e:
        print(f"Error: {e}")
