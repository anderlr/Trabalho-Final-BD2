--Otimizações
CREATE INDEX match_championName ON match_summ_details USING btree ("championName");

-- para verificar a alteração
SELECT * FROM pg_indexes WHERE tablename = 'match_summ_details'; 

--Definição de grupos de usuários e suas permissões
CREATE ROLE admin;
GRANT ALL PRIVILEGES ON DATABASE "loldatabase" TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
CREATE USER adm WITH PASSWORD '4321' IN ROLE admin;

CREATE ROLE app;
GRANT SELECT ON ALL TABLES IN SCHEMA public to app;
GRANT USAGE ON SCHEMA public to app;
CREATE USER usuapp WITH PASSWORD '1234' IN ROLE app;


--Views
CREATE VIEW partidas_jogadas AS select u.name, u."summonerLevel", COUNT(m.*) as Partidas  
from summoners u right join match_summ_details m on u.puuid = m.summ_puuid GROUP BY(u.name, u."summonerLevel");

--consultar a view criada
select * from partidas_jogadas 