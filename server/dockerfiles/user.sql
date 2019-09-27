create table `user`
(
	id int(11) unsigned auto_increment
		primary key,
	name varchar(50) not null,
	contact varchar(50) not null default "",
	location varchar (50) not null default "",
	follower varchar(5000) not null default "",
	following varchar(5000) not null default "",
	commit_ids varchar(5000) not null default "",
	followers_num int(11) not null default 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8;