from flask import Flask
import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")

app = Flask(__name__)


@app.route('/')
def home():
    return 'Hello, world!'


if __name__ == '__main__':
    app.run(port=5000)
