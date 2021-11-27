# Trabalho Final de Banco de Dados 2
O projeto consiste em uma API que busca os dados do jogo League of Legends
da Riot Games API e trata os mesmo pra depois inserir em um banco de dados PostgreSQL

## Equipe
- Anderson Leandro - 2018019033
- Ikaro Siqueira - 2019000054
- Vinicius Rezende - 2019003940
- Lucas da Silva Marcelo - 2019004868
- Luiz Eduardo - 2019003136

## Como rodar o projeto
1. Clone o projeto
2. Mude o nomedo arquivo .envExample para .env e coloque nele sua chave de api
2. Rode o comando `npm install` na pasta do projeto
3. Rode o comando `npm start`
4. Restaure no postgresql o banco "loldatabase.backup"

OBS: caso vá utilizar a API para popular você deve colocar o nome do banco como : "loldatabase",
ou ao menos bater com o nome no database.js. Mas para fins de teste o nome não precisa ser igual.


## Api utilizada
https://developer.riotgames.com/apis
-summoners(nickname/puuid)
-matches
## Rotas Implementadas para esse projeto
urlBase = http://localhost:5000

- {urlBase}/insertData
