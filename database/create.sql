CREATE TABLE rockets (
    id varchar(100) PRIMARY KEY,
    name varchar(100),
    height real,
    mass real,
    stages integer,
    first_flight date
);

CREATE TABLE launchpads (
    id varchar(100) PRIMARY KEY,
    name varchar(100),
    locality varchar(100),
    region varchar(100),
    latitude real NOT NULL,
    longitude real NOT NULL
);

CREATE TABLE launches(
    id varchar(100) PRIMARY KEY,
    flight_number integer NOT NULL,
    name varchar(100) UNIQUE NOT NULL,
    date date NOT NULL,
    success BOOLEAN NOT NULL,
    id_rocket integer REFERENCES rockets(id) NOT NULL,
    id_launchpad integer REFERENCES launchpads(id) NOT NULL
);

CREATE TABLE images (
    id varchar(100) PRIMARY KEY,
    link text UNIQUE NOT NULL,
    id_rocket integer REFERENCES rockets(id),
    id_launchpad integer REFERENCES launchpads(id)
);