import pymysql
import math

db = pymysql.connect(host='127.0.0.1',
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
    db.ping(reconnect=True)
    with open("user_name.txt", "r") as txt_file:
        user = list(txt_file)
    user = [name.replace("\n", "") for name in user]

    with open("new_result.txt", "r") as tt:
        page_rank = list(tt)
    user_score = {}
    for row in page_rank:
        name, s = row.split()[0], float(row.split()[1])
        name = name.replace("+", " ")
        user_score[name] = s
    print(user_score)
    scores = []
    for u in user:
        scores.append(user_score.get(u, 0))
    scores = normalize(scores)
    print(scores)
    for i in range(len(user)):
        sql = "update `user` set page_rank_score=%s WHERE name='%s';" % (scores[i], user[i])
        cursor.execute(sql)
        db.commit()
    db.close()
    return


def generate_page_rank_data():
    db.ping(reconnect=True)
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
    update_page_rank_score()
