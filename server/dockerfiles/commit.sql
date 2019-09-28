CREATE TABLE `commit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `commit_sha` varchar(50) NOT NULL,
  `commit_msg` varchar(100) NOT NULL DEFAULT '',
  `commit_total` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `repo` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `commit_commit_sha_uindex` (`commit_sha`)
) ENGINE=InnoDB AUTO_INCREMENT=12712 DEFAULT CHARSET=utf8

