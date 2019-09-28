from github import Github
import pymysql
import time

db = pymysql.connect(host='localhost',
                     port=13306,
                     user='teamname',
                     password='teamname',
                     db='github_infos',
                     charset='utf8')

cursor = db.cursor()

def get_short_user_name():
    g = Github("16b13aef930a91adae41847aec7e88167d7fb5a3")
    with open("name_map.txt", "r") as tt:
        tmp = list(tt)
    user_tmp = [i.split("->")[0][:-1] for i in tmp]
    print(user_tmp)
    with open("user_profile.txt", "w") as txt:
        for row in tmp:
            user_name = row.split("->")[0][:-1]
            url = row.split("->")[1][1:]
            txt.write("%s -> %s\n" % (user_name, url.replace("https://api.github.com/users/", "https://github.com/")))
    return

def get_user_infos():
    db.ping(reconnect=True)
    g = Github("b259ad9fe82e2db0200711d22333bc1dfdaa5a41")
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
    get_short_user_name()
