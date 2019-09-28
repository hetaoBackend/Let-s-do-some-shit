import json
import pymysql
import os

db = pymysql.connect(host='172.16.199.75',
                     port=13306,
                     user='teamname',
                     password='teamname',
                     db='github_infos',
                     charset='utf8')

cursor = db.cursor()


def msg_scores():
    print(os.getcwd())
    with open("tone_score.json", 'r') as load_f:
        load_dict = json.load(load_f)
        print(load_dict)
    keys = []
    tmp_scores = []
    for key, val in load_dict.items():
        keys.append(key)
        tmp_scores.append(parse_score(val['document_tone']['tones']))
    _max = max(tmp_scores)
    _min = min(tmp_scores)
    scores = [int((score-_min)/(_max-_min)*80)+20 for score in tmp_scores]
    for i in range(len(keys)):
        sql = "update `pr` set pr_score=%s WHERE merge_commit_sha='%s';" % (scores[i], keys[i])
        cursor.execute(sql)
        db.commit()

    db.close()


def parse_score(tones):
    joy = 0
    analytical = 0
    confident = 0
    for tone in tones:
        if tone['tone_id'] == 'analytical':
            analytical = tone['score']
        elif tone['tone_id'] == 'joy':
            joy = tone['score']
        elif tone['tone_id'] == 'confident':
            joy = tone['score']
    return joy*3+analytical*10+confident*5


if __name__ == "__main__":
    msg_scores()
