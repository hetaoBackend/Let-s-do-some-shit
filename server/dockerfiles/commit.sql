create table `commit`
(
	id int(11) unsigned auto_increment
		primary key,
	commit_sha varchar(50) not null,
	commit_msg varchar(100) not null,
	commit_total int(11) not null,
	user_name varchar(50) not null default "",
	repo varchar(100) not null default ""
)ENGINE=InnoDB DEFAULT CHARSET=utf8;