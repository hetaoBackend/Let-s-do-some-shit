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

def get_commit_infos():
    g = Github("d1fc35107b9be23d0208cbe6628e65312a83a5a6")
    repos = []
    # repos.append(g.get_repo("elastic/elasticsearch-hadoop"))
    repos.append(g.get_repo("elastic/elasticsearch"))
    # repos.append(g.get_repo("elastic/elasticsearch-metrics-reporter-java"))
    offset = 202
    for repo in repos:
        commits = repo.get_commits()
        for i in range(offset, offset+50):
            print("offset: %s" % i)
            temp = commits.get_page(i)
            if len(temp) <= 0:
                break
            for commit in temp:
                try:
                    if not commit or not commit.author or not commit.author.name or not commit.stats:
                        continue
                    print(commit.sha, commit.author.name, commit.stats.total, repo.name)
                    cursor.execute("INSERT ignore INTO `commit` (`commit_sha`, `commit_total`, `user_name`, `repo`) VALUES ('%s', %s, '%s', '%s');" % (
                    commit.sha, commit.stats.total, pymysql.escape_string(commit.author.name), repo.name))
                    db.commit()
                except ValueError:
                    print("Oops!  That was no valid number.  Try again...")
    db.close()


if __name__ == "__main__":
    get_commit_infos()
