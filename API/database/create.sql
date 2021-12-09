CREATE TABLE summoner (
    name varchar(30) UNIQUE NOT NULL,
    puuid varchar(78) PRIMARY KEY,
    profileIconid integer NOT NULL,
    summonerLevel integer NOT NULL
);


CREATE TABLE match (
    matchid varchar(100) PRIMARY KEY,
    gameMode varchar(100) NOT NULL,
    gameDuration integer NOT NULL,
    gameName varchar(100) NOT NULL,
    queueId integer NOT NULL,
    total_kills integer NOT NULL
);

CREATE TABLE match_summ_details(
    summ_puuid varchar(78) REFERENCES summoner(puuid),
    matchid varchar(100) REFERENCES match(matchid),
    kills integer NOT NULL,
    deaths integer NOT NULL,
    assists integer NOT NULL,
    championName varchar(100) NOT NULL,
    lane varchar(100) NOT NULL,
    goldEarned integer NOT NULL,
    win boolean NOT NULL,
    PRIMARY KEY(summ_puuid, matchid)
)