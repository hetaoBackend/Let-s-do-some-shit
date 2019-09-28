# -*- coding: utf-8 -*-

from github import Github


def get_follow_infos():
    g = Github("6be01d3dae80b1230fee8e8104d6772bb8922c9b")
    repos = []
    repos.append(g.get_repo("elastic/elasticsearch"))
    repos.append(g.get_repo("elastic/elasticsearch-hadoop"))
    repos.append(g.get_repo("elastic/elasticsearch-metrics-reporter-java"))
    stack = []
    done_pool = set()
    count = 0
    for repo in repos:
        if count >= 1:
            break
        cons = repo.get_contributors()
        if cons.totalCount < 3:
            continue
        for user in cons:
            if user and user.name:
                stack.append(user)
        count += 1
    print("start get the follow infos")
    with open("follow.txt", "w") as txt_file:
        while stack:
            user_tmp = stack.pop()
            if not user_tmp or not user_tmp.name:
                continue
            follower = user_tmp.get_followers()
            cnt = 0
            for u in follower:
                if cnt >= 99:
                    break
                if not u or not u.name:
                    continue
                if u.name not in done_pool:
                    stack.append(u)
                res = "%s %s" %(u.name.replace(" ", ""), user_tmp.name.replace(" ", ""))
                print(res)
                txt_file.write(res + "\n")
                cnt += 1
            done_pool.add(user_tmp.name)
    print("The task is done")
    return


if __name__ == "__main__":
    get_follow_infos()
