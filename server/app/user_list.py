import json
from flask import Blueprint
from server.app.config import cursor, obj, default,auth

user_list = Blueprint('user_list',__name__)

@user_list.route('/', methods=['GET'])
@auth.login_required
def get_user_list():

    test = obj()
    _dict = {}
    demo_user = []

    test.categories.append({"name": "elasticsearch", "keyword": {}, "base": "elasticsearch"})
    test.categories.append({"name": "elasticsearch-hadoop", "keyword": {}, "base": "elasticsearch-hadoop"})
    test.categories.append({"name": "elasticsearch-metrics-reporter-java", "keyword": {}, "base": "elasticsearch-metrics-reporter-java"})

    sql = "SELECT distinct user_name FROM pr where repo = 'elasticsearch'"
    cursor.execute(sql)
    results = cursor.fetchall()
    for row in results:
        user_name = row[0]
        query = "select followers_num, total_repo_num, following from user where name = '%s'"%user_name
        cursor.execute(query)
        res = cursor.fetchone()
        if not res:
            continue
        # ToDo: how to calculate the value
        value = int(res[0]*10+res[1])
        test.nodes.append({"name": user_name, "value": value, "category": 0})
        _dict[user_name] = res[2].split(",")
        demo_user.append(user_name)

    sql = "SELECT distinct user_name FROM pr where repo = 'elasticsearch-hadoop'"
    cursor.execute(sql)
    results = cursor.fetchall()
    for row in results:
        user_name = row[0]
        query = "select followers_num, total_repo_num, following from user where name = '%s'" % user_name
        cursor.execute(query)
        res = cursor.fetchone()
        if not res:
            continue
        # ToDo: how to calculate the value
        value = int(res[0] * 10 + res[1])
        test.nodes.append({"name": user_name, "value": value, "category": 1})
        _dict[user_name] = res[2].split(",")
        demo_user.append(user_name)

    sql = "SELECT distinct user_name FROM pr where repo = 'elasticsearch-metrics-reporter-java'"
    cursor.execute(sql)
    results = cursor.fetchall()
    for row in results:
        user_name = row[0]
        query = "select followers_num, total_repo_num, following from user where name = '%s'" % user_name
        cursor.execute(query)
        res = cursor.fetchone()
        if not res:
            continue
        # ToDo: how to calculate the value
        value = int(res[0] * 10 + res[1])
        test.nodes.append({"name": user_name, "value": value, "category": 2})
        _dict[user_name] = res[2].split(",")
        demo_user.append(user_name)
    print(len(demo_user))

    for key in _dict:
        for dd in demo_user:
            if dd in _dict[key]:
                test.links.append({"source": demo_user.index(key), "target": demo_user.index(dd)})

    res = json.dumps(test, default=default)
    return res
