CREATE TABLE `pr` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `merge_commit_sha` varchar(100) NOT NULL DEFAULT '',
  `pr_title` varchar(1000) NOT NULL DEFAULT '',
  `labels` varchar(1000) NOT NULL,
  `user_name` varchar(50) NOT NULL DEFAULT '',
  `is_merged` varchar(50) NOT NULL DEFAULT 'False',
  `repo` varchar(100) NOT NULL DEFAULT '',
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pr_merge_commit_sha_uindex` (`merge_commit_sha`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8

