import json
from pymongo import MongoClient
from bson import json_util
mongo_client = MongoClient('mongodb://localhost:27017/')
coll = mongo_client['tiktokDB']['tiktok_cluster']

clusters = []
partais = []


def parse_json(data):
    return json.loads(json_util.dumps(data))


def get_clusters():
    result = parse_json(coll.aggregate([
        {
            '$group': {
                '_id': None,
                'clusters': {
                    '$addToSet': '$cluster'
                }
            }
        }
    ]))[0]["clusters"]
    result.sort()
    global clusters
    clusters = result
    print(clusters)
    return result


def get_partais():
    result = parse_json(coll.aggregate([
        {
            '$group': {
                '_id': None,
                'partais': {
                    '$addToSet': '$label'
                }
            }
        }
    ]))[0]["partais"]
    global partais
    partais = result
    print(partais)
    return result


def get_scatterplot(partai=None, cluster=None):
    global partais
    global clusters
    if partai is None:
        if partais == []:
            get_partais()
        partai = partais
    if cluster is None:
        if clusters == []:
            get_clusters()
        cluster = clusters
    result = parse_json(coll.aggregate([
        {
            '$match': {
                '$and': [
                    {
                        'label': {
                            '$in': partai
                        }
                    }, {
                        'cluster': {
                            '$in': cluster
                        }
                    }
                ]
            }
        }
    ]))
    return result


def get_table(partai=None, cluster=None):
    global partais
    global clusters
    if partai is None:
        if partais == []:
            get_partais()
        partai = partais
    if cluster is None:
        if clusters == []:
            get_clusters()
        cluster = clusters
    result = parse_json(coll.aggregate([
        {
            '$match': {
                'label': {
                    '$in': partai
                },
                'cluster': {
                    '$in': cluster
                }
            }
        }, {
            '$group': {
                '_id': {
                    'label': '$label',
                    'cluster': '$cluster'
                },
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$group': {
                '_id': '$_id.label',
                'clusters': {
                    '$push': {
                        'cluster': '$_id.cluster',
                        'count': '$count'
                    }
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'label': '$_id',
                'clusters': 1
            }
        }
    ]))
    return result


def get_piechart(partai=None, cluster=None, type="cluster"):
    global partais
    global clusters
    if partai is None:
        if partais == []:
            get_partais()
        partai = partais
    if cluster is None:
        if clusters == []:
            get_clusters()
        cluster = clusters
    if type == "cluster":
        result = parse_json(coll.aggregate([
            {
                '$match': {
                    'label': {
                        '$in': partai
                    },
                    'cluster': {
                        '$in': cluster
                    }
                }
            }, {
                '$group': {
                    '_id': {
                        'label': '$label',
                        'cluster': '$cluster'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id.label',
                    'clusters': {
                        '$push': {
                            'cluster': '$_id.cluster',
                            'count': '$count'
                        }
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'label': '$_id',
                    'clusters': 1
                }
            }
        ]))
    else:
        result = parse_json(coll.aggregate([
            {
                '$match': {
                    'label': {
                        '$in': partai
                    },
                    'cluster': {
                        '$in': cluster
                    }
                }
            }, {
                '$group': {
                    '_id': {
                        'label': '$label',
                        'cluster': '$cluster'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id.cluster',
                    'partais': {
                        '$push': {
                            'partai': '$_id.label',
                            'count': '$count'
                        }
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'cluster': '$_id',
                    'partais': 1
                }
            }
        ]))
    return result


def get_barchart(partai=None, cluster=None):
    global partais
    global clusters
    if partai is None:
        if partais == []:
            get_partais()
        partai = partais
    if cluster is None:
        if clusters == []:
            get_clusters()
        cluster = clusters
    result = parse_json(coll.aggregate([
        {
            '$match': {
                'label': {
                        '$in': partai
                        },
                'cluster': {
                    '$in': cluster
                }
            }
        }, {
            '$group': {
                '_id': {
                    'label': '$label',
                    'cluster': '$cluster'
                },
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$group': {
                '_id': '$_id.label',
                'clusters': {
                    '$push': {
                        'cluster': '$_id.cluster',
                        'count': '$count'
                    }
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'label': '$_id',
                'clusters': 1
            }
        }
    ]))
    return result
