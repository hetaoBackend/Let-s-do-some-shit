from github import Github
import pymysql

db = pymysql.connect(host='localhost',
                     port=13306,
                     user='teamname',
                     password='teamname',
                     db='github_infos',
                     charset='utf8')

cursor = db.cursor()


def get_user_infos():
    g = Github("608e938ca68704dffac199b91ac3be66507e2518")
    with open("user_name.txt", "r") as txt_file:
        user = list(txt_file)
    user = [name.replace("\n", "") for name in user[102:103]]

    for u in user:
        print(u)
        tmp_user = g.search_users(u, order="desc")
        for user in tmp_user.get_page(0):
            follower_num = user.get_followers().totalCount
            following = user.get_following()
            tmp = []
            print("%s find following\n" % u)
            for i in range(100):
                temp_following = following.get_page(i)
                if len(temp_following) <= 0:
                    break
                for dd in temp_following:
                    if dd and dd.name:
                        tmp.append(dd.name)

            print(
                "INSERT INTO `user` (`name`, `company`, `location`, `following`, `followers_num`, `total_repo_num`) VALUES ('%s', '%s', '%s', '%s', %s, %s)" % (
                    pymysql.escape_string(u), pymysql.escape_string(user.company if user.company else ""),
                    pymysql.escape_string(user.location if user.location else ""), pymysql.escape_string(",".join(tmp)),
                    follower_num, user.get_repos().totalCount))

            cursor.execute(
                "INSERT INTO `user` (`name`, `company`, `location`, `following`, `followers_num`, `total_repo_num`) VALUES ('%s', '%s', '%s', '%s', %s, %s)" % (
                    pymysql.escape_string(u), pymysql.escape_string(user.company if user.company else ""),
                    pymysql.escape_string(user.location if user.location else ""), pymysql.escape_string(",".join(tmp)),
                    follower_num, user.get_repos().totalCount))
            db.commit()
            break

    db.close()


if __name__ == "__main__":
    get_user_infos()
