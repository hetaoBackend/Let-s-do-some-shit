import pymysql

db = pymysql.connect(host='172.16.199.75',
                     port=13306,
                     user='teamname',
                     password='teamname',
                     db='github_infos',
                     charset='utf8')

cursor = db.cursor()


def generate_data():
    db.ping(reconnect=True)
    with open("user_name.txt", "r") as txt_file:
        user = list(txt_file)
    user = [name.replace("\n", "") for name in user]
    with open("five_dimensions_data.txt", "w") as tt:
        for u in user:
            print(u)
            sql = "select followers_num, total_repo_num from user where name = '%s'" % u
            cursor.execute(sql)
            res = cursor.fetchone()
            followers_num = int(res[0]) if res and res[0] else 0
            total_repo_num = int(res[1]) if res and res[1] else 0
            sql = "select count(*) from pr where user_name = '%s'" % u
            cursor.execute(sql)
            res = cursor.fetchone()
            pr_num = int(res[0])
            sql = "select count(*), sum(commit_total) from commit where user_name = '%s'" % u
            cursor.execute(sql)
            res = cursor.fetchone()
            commit_num = int(res[0]) if res and res[0] else 0
            total_line_num = int(res[1]) if res and res[1] else 0
            sql = "select avg(pr_score) from pr where user_name = '%s' group by user_name" % u
            cursor.execute(sql)
            res = cursor.fetchone()
            pr_score = int(res[0]) if res and res[0] else 20
            sql = "select labels from pr where user_name = '%s' and labels not like '*bug*'" % u
            cursor.execute(sql)
            rows = cursor.fetchall()
            tag_num = 0
            for row in rows:
                tag_num += len(row[0].split(","))
            tt.write("%s %s %s %s %s %s %s %s" % (u, followers_num, total_repo_num, pr_num, commit_num, tag_num, total_line_num, pr_score)+"\n")

    db.close()


if __name__ == "__main__":
    generate_data()
