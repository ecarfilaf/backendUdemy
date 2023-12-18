create database world;

/*  In DB world excute script tables:  */

create table capitals (
	id SERIAL PRIMARY KEY,
	country	VARCHAR(45),
	capital	VARCHAR(45)
);

create table flags (
	id SERIAL PRIMARY KEY,
	name	VARCHAR(45),
	flag	TEXT
);
