import sys

f = open(sys.argv[1])
fout = open("graph.txt", "w")
name2id = {}
for line in f:
    a, b = line.split()
    if a not in name2id:
        name2id[a] = len(name2id)
    if b not in name2id:
        name2id[b] = len(name2id)
    print(name2id[a],name2id[b],file=fout)