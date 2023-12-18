CREATE TABLE countries(
	id SERIAL PRIMARY KEY,
	country_code	VARCHAR(2) NOT NULL UNIQUE,
	country_name	VARCHAR(100)
);

CREATE TABLE visited_countries(
	id SERIAL PRIMARY KEY,
	country_code	VARCHAR(2) NOT NULL UNIQUE
);