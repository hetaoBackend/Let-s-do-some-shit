import os
import math
from flask import Blueprint, request, jsonify, abort
from server.app.config import auth

user = Blueprint('user',__name__)


@user.route('/', methods=['POST'])
# @auth.login_required
def get_user():
    if not request.json or 'username' not in request.json:
        print("test1")
        abort(400)
    else:
        user_name = request.json['username']
        users, d1, d2, d3, d4, d5 = parse_five_domains()
        if user_name not in users:
            print("test2")
            abort(400)
        res = {}
        idx = users.index(user_name)
        res["technical"] = d1[idx]
        res["communication"] = d2[idx]
        res["innovation"] = d3[idx]
        res["engagement"] = d4[idx]
        res["diversity"] = d5[idx]
        res["url"] = parse_user_url(user_name)
        return jsonify(res) if res else jsonify({'result': 'not found'})


def parse_five_domains():
    with open(os.getcwd()+"/data-extract/five_dimensions_data.txt", "r") as txt_file:
        rows = list(txt_file)
    d1 = []
    d2 = []
    d3 = []
    d4 = []
    d5 = []
    users = []
    for row in rows:
        tmp_list = row.split()
        length = len(tmp_list)
        user_name = " ".join(tmp_list[:length-7])
        followers_num, total_repo_num, pr_num, commit_num, tag_num, total_line_num, pr_score = list(map(int, tmp_list[length-7:]))
        d1.append(total_line_num * 0.01 + pr_num * 2)
        d2.append(pr_score)
        d3.append(10*tag_num+followers_num)
        d4.append(pr_num*2 + commit_num+10*followers_num)
        d5.append(total_repo_num)
        users.append(user_name)

    return users, normalize(d1), normalize(d2), normalize(d3), normalize(d4), normalize(d5)


def normalize(nums):
    if not nums:
        return nums
    nums = [math.log(1+num) for num in nums]
    _max = max(nums)
    _min = min(nums)
    return [int(float(num-_min)/float(_max-_min)*50)+50 for num in nums]


def parse_user_url(user_name):
    with open(os.getcwd() + "/data-extract/user_profile.txt", "r") as txt_file:
        rows = list(txt_file)
    for row in rows:
        target = row.split("->")[0][:-1]
        if target == user_name:
            return row.split("->")[1][1:].replace("\n", "")
    return ""