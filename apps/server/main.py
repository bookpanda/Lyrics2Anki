from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from threading import Thread

app = Flask(__name__)
cors = CORS(app)


@cross_origin()
@app.route("/", methods=["POST"])
def index():
    print("req")
    content = request.form.get("contents")


def run():
    app.run(host="0.0.0.0", port=8080)


def keep_alive():
    server = Thread(target=run)
    server.start()


keep_alive()
