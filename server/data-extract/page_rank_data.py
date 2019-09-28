import pymysql
import math

db = pymysql.connect(host='172.16.199.75',
                     port=13306,
                     user='teamname',
                     password='teamname',
                     db='github_infos',
                     charset='utf8')

cursor = db.cursor()


def normalize(nums):
    if not nums:
        return nums
    nums = [math.log(1+num) for num in nums]
    _max = max(nums)
    _min = min(nums)
    return [int(float(num-_min)/float(_max-_min)*50)+50 for num in nums]

def update_page_rank_score():
    with open("user_name.txt", "r") as txt_file:
        user = list(txt_file)
    user = [name.replace("\n", "") for name in user]

    id_dict = {}
    for u in user:
        print(u)
        sql = "select id from user where name = '%s'" % u
        cursor.execute(sql)
        row = cursor.fetchone()
        if not row:
            continue
        id = row[0]
        id_dict[u] = id
    print(id_dict)
    with open("new_result.txt", "r") as tt:
        page_rank = list(tt)
    user_score = {}
    for row in page_rank:
        id, s = list(map(float, row.split()))
        user_score[int(id)] = s
    print(user_score)
    scores = []
    for u in user:
        scores.append(user_score.get(id_dict.get(u, 0), 0))
    print(scores)
    return


def generate_page_rank_data():
    with open("user_name.txt", "r") as txt_file:
        user = list(txt_file)
    user = [name.replace("\n", "") for name in user]
    following_dict = {}
    id_dict = {}
    for u in user:
        print(u)
        sql = "select id, following from user where name = '%s'" % u
        cursor.execute(sql)
        row = cursor.fetchone()
        if not row:
            continue
        id = row[0]
        following = row[1]
        following_dict[u] = following
        id_dict[u] = id

    with open("page_rank.txt", "w") as tt:
        for u in user:
            if u not in id_dict:
                continue
            for v in user:
                if u == v or v not in id_dict:
                    continue
                if v in following_dict[u]:
                    tt.write("%s %s\n" % (u.replace(" ", "+"), v.replace(" ", "+")))

    db.close()


if __name__ == "__main__":
    generate_page_rank_data()
