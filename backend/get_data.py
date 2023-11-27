import json
from pymongo import MongoClient
mongo_client = MongoClient('mongodb://localhost:27017/')
coll = mongo_client['tiktokDB']['tiktok_cluster']


def get_data_cluster(clusters=[], partais=[])
    print("tesss")
    return list(coll.aggregate([
        {
            '$group': {
                '_id': None,
                'clusters': {
                    '$addToSet': '$cluster'
                }
            }
        }
    ]))[0]["clusters"].sort()
