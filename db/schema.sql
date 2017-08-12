drop database if exists doggie_date_db;
create database doggie_date_db;

	create table dogs (
	id int auto_increment,
    dog_name varchar(255) not null,
    image varchar(255) not null,
    energy_level varchar(255) not null,
    sex varchar(255) not null,
    size varchar(255) not null,
    dob varchar(255) not null,
    createdAt datetime not null,
       updatedAt datetime not null,
    primary key(id)
);

CREATE TABLE facebooks (

  id int auto_increment,
    name varchar(255) not null,
     gender varchar(255) not null,
      appid varchar(255) not null,
       token varchar(255) not null,
    email varchar(255) not null,
    profileUrl varchar(255) not null,
    createdAt datetime not null,
       updatedAt datetime not null,
    primary key(id)
);

CREATE TABLE users (

  id int auto_increment,
    email varchar(255) not null,
     password varchar(255) not null,
      createdAt datetime not null,
       updatedAt datetime not null,
    primary key(id)
);