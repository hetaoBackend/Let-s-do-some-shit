# -*- coding: utf-8 -*-

from github import Github
import pymysql

db = pymysql.connect(host='localhost',
                             port=13306,
                             user='teamname',
                             password='teamname',
                             db='github_infos',
                             charset='utf8')
cursor = db.cursor()

def get_repo_infos():
    db.ping(reconnect=True)
    g = Github("d1fc35107b9be23d0208cbe6628e65312a83a5a6")
    repos = []
    repos.append(g.get_repo("elastic/elasticsearch-hadoop"))
    repos.append(g.get_repo("elastic/elasticsearch"))
    repos.append(g.get_repo("elastic/elasticsearch-metrics-reporter-java"))
    offset = 0
    for repo in repos:
        prs = repo.get_pulls()
        for i in range(offset, offset+50):
            print("offset:%s"%i)
            temp = prs.get_page(i)
            if len(temp) <= 0:
                break
            for pr in temp:
                try:
                    if not pr or not pr.user or not pr.user.name:
                        continue
                    print("INSERT ignore INTO `pr` (`merge_commit_sha`, `pr_title`, `labels`, `user_name`, `is_merged`, `repo`, `status`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s');" % (pr.merge_commit_sha, pr.title, ','.join([label.name for label in pr.labels]), pymysql.escape_string(pr.user.name), str(pr.is_merged()), repo.name, pr.state))
                    cursor.execute("INSERT ignore INTO `pr` (`merge_commit_sha`, `pr_title`, `labels`, `user_name`, `is_merged`, `repo`, `status`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s');" % (pr.merge_commit_sha, pymysql.escape_string(pr.title), pymysql.escape_string(','.join([label.name for label in pr.labels])), pymysql.escape_string(pr.user.name), str(pr.is_merged()), repo.name, pr.state))
                    db.commit()
                except ValueError:
                    print("Oops!  That was no valid number.  Try again...")
    db.close()


if __name__ == "__main__":
    get_repo_infos()
