import sys
sys.path.append("pageRank/python")
from pageRank import pageRank

links = [[]]

def read_file(filename):
    f = open(filename, 'r')
    for line in f:
        (frm, to) = map(int, line.split(" "))
        extend = max(frm - len(links), to - len(links)) + 1
        for i in range(extend):
            links.append([])
        links[frm].append(to)
    f.close()

read_file(sys.argv[1])

pr =  pageRank(links, alpha=0.85, convergence=0.00001, checkSteps=10)

ans = []
for i in range(len(pr)):
    ans.append((pr[i], i))
    
ans.sort()
for v, k in ans:
    print(k, v)

