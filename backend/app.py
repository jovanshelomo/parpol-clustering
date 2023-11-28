from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import get_data
app = Flask(__name__)
cors = CORS(app)


@app.route('/clusters', methods=['GET'])
@cross_origin()
def get_clusters():
    return jsonify(get_data.get_clusters())


@app.route('/partais', methods=['GET'])
@cross_origin()
def get_partais():
    return jsonify(get_data.get_partais())


@app.route('/scatterplot', methods=['GET'])
@cross_origin()
def get_scatterplot():
    args = request.args
    partai = None
    cluster = None
    if "partai" in args:
        if args.get("partai") == "":
            partai = []
        else:
            partai = args.get("partai").split(",")
    if "cluster" in args:
        if args.get("cluster") == "":
            cluster = []
        else:
            cluster = list(map(int, args.get("cluster").split(",")))
    return jsonify(get_data.get_scatterplot(partai, cluster))


@app.route('/table', methods=['GET'])
@cross_origin()
def get_table():
    args = request.args
    partai = None
    cluster = None
    if "partai" in args:
        if args.get("partai") == "":
            partai = []
        else:
            partai = args.get("partai").split(",")
    if "cluster" in args:
        if args.get("cluster") == "":
            cluster = []
        else:
            cluster = list(map(int, args.get("cluster").split(",")))
    return jsonify(get_data.get_table(partai, cluster))


@app.route("/piechart", methods=["GET"])
@cross_origin()
def get_piechart():
    args = request.args
    partai = None
    cluster = None
    if "partai" in args:
        if args.get("partai") == "":
            partai = []
        else:
            partai = args.get("partai").split(",")
    if "cluster" in args:
        if args.get("cluster") == "":
            cluster = []
        else:
            cluster = list(map(int, args.get("cluster").split(",")))
    if "type" in args:
        type = args.get("type")
    return jsonify(get_data.get_piechart(partai, cluster, type))


@app.route("/barchart", methods=["GET"])
@cross_origin()
def get_barchart():
    args = request.args
    partai = None
    cluster = None
    if "partai" in args:
        if args.get("partai") == "":
            partai = []
        else:
            partai = args.get("partai").split(",")
    if "cluster" in args:
        if args.get("cluster") == "":
            cluster = []
        else:
            cluster = list(map(int, args.get("cluster").split(",")))
    return jsonify(get_data.get_barchart(partai, cluster))


if __name__ == '__main__':
    app.run(port=5000, debug=True)
