#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

def default(o):
    if hasattr(o, 'to_json'):
        return o.to_json()
    raise TypeError(f'Object of type {o.__class__.__name__} is not JSON serializable')


class obj(object):
    def __init__(self):
        self.type = "force"
        self.categories = []
        self.nodes = []
        self.links = []

    def to_json(self):
        return {'type': self.type, 'categories': self.categories, 'nodes': self.nodes, 'links': self.links}

search_data = {
    "find substring": {"code":
                           """
                           public static String substringBefore(String input, String substring) {
        int index = input.indexOf(substring);
        if (index == -1) {
            return "";
        } else {
            return input.substring(0, index);
        }
    }
""",
                                  "link": "https://github.com/jboss/jboss-jstl-api_spec/blob/4ad412ae5be1ae606b8d33c188cb3d98bfcbe84c/src/main/java/org/apache/taglibs/standard/functions/Functions.java#L192-L199",
                                  "description": """
                                  Returns a subset of a string immediately before the first occurrence of a specific substring.
<p>If the substring is empty, it matches the beginning of the input string and an empty string is returned.
If the substring does not occur, an empty string is returned.
"""},
"connect to mongodb": {"code":
                           """
                           getOrInitDefaultDatabase() {
        String connectionString = XianConfig.get("mongodb_connection_string");
        String database = XianConfig.get("mongodb_database");
        return getOrInitDefaultDatabase(connectionString, database);
    }
""",
                                  "link": "https://github.com/xiancloud/xian/blob/1948e088545553d2745b2c86d8b5a64988bb850e/xian-dao/xian-mongodbdao/xian-mongodbdao-sync/src/main/java/info/xiancloud/plugin/dao/mongodb/Mongo.java#L43-L47",
                                  "description": """
                                  Get default mongodb database reference or initiate it if not initialized.

@return the default mongodb database reference
"""},
"depth first search": {"code":
                           """
                           public int depth() {
        if (isLeaf())
            return 1;
        return 1 + max(max(northWest.depth(), northEast.depth()), max(southWest.depth(), southEast.depth()));
    }
""",
                                  "link": "https://github.com/deeplearning4j/deeplearning4j/blob/effce52f2afd7eeb53c5bcca699fcd90bd06822f/deeplearning4j/deeplearning4j-nearestneighbors-parent/nearestneighbor-core/src/main/java/org/deeplearning4j/clustering/quadtree/QuadTree.java#L304-L308",
                                  "description": """
                                  The depth of the node
@return the depth of the node
"""},
"add an event listener": {"code":
                           """
                           public void addEventListener(EventType eventType, Consumer<PrimitiveEvent> listener) {
    executor.execute(() -> eventListeners.computeIfAbsent(eventType.canonicalize(), e -> Sets.newLinkedHashSet()).add(listener));
  }
""",
                                  "link": "https://github.com/atomix/atomix/blob/3a94b7c80576d762dd0d396d4645df07a0b37c31/protocols/raft/src/main/java/io/atomix/protocols/raft/session/impl/RaftSessionListener.java#L69-L71",
                                  "description": """
                                  Adds an event listener to the session.

@param listener the event listener callback
"""},
"Close an open file": {"code":
                           """
                           public void startCycleTimer(int iDelayMS)
    {
        if (m_cycletimer == null)
        {
            m_cycletimer = new Timer(iDelayMS, this);
            m_cycletimer.setRepeats(false);
            m_cycletimer.start();
        }
        else
            m_cycletimer.restart();
    }
""",
                                  "link": "https://github.com/jbundle/jbundle/blob/4037fcfa85f60c7d0096c453c1a3cd573c2b0abc/app/program/manual/backup/src/main/java/org/jbundle/app/program/manual/backup/BackupServerApp.java#L263-L273",
                                  "description": """
                                  Wait, then close the file so a new file can open.
"""}
}
