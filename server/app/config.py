#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pymysql
from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

github_infos_db = pymysql.connect(host='localhost',
                             port=13306,
                             user='teamname',
                             password='teamname',
                             db='github_infos',
                             charset='utf8')
cursor = github_infos_db.cursor()

# initialization

def default(o):
    if hasattr(o, 'to_json'):
        return o.to_json()
    raise TypeError(f'Object of type {o.__class__.__name__} is not JSON serializable')


class obj(object):
    def __init__(self):
        self.type = "force"
        self.categories = []
        self.nodes = []
        self.links = []

    def to_json(self):
        return {'type': self.type, 'categories': self.categories, 'nodes': self.nodes, 'links': self.links}


# @app.route('/user', methods=['GET'])
# def get_user():
#     if not request.args or 'user_name' not in request.args:
#         # 没有指定id则返回全部
#         return jsonify(test_datas)
#     else:
#         user_name = request.args['user_name']
#         res = test_datas[user_name]
#         return jsonify(res) if res else jsonify({'result': 'not found'})
