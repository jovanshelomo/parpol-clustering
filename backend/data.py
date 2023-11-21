import json
from pymongo import MongoClient

pipeline = [
    {
        '$group': {
            '_id': {
                'cluster': '$cluster',
                'label': '$label'
            },
            'count': {
                '$sum': 1
            }
        }
    }, {
        '$group': {
            '_id': '$_id.cluster',
            'labelCounts': {
                '$push': {
                    'label': '$_id.label',
                    'count': '$count'
                }
            }
        }
    }
]

def get_data_cluster(collection_cluster):
    return collection_cluster.aggregate(pipeline)