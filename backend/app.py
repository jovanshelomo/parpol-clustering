from flask import Flask, jsonify
import pymongo
import get_data
app = Flask(__name__)


@app.route('/')
def home():
    return 'Hello, world!'


@app.route('/cluster', methods=['GET'])
def get_data_cluster():
    return jsonify(get_data.get_data_cluster())


if __name__ == '__main__':
    app.run(port=5000, debug=True)
