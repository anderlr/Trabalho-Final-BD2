# Trabalho Final de Banco de Dados 2

## Introdução
O projeto consiste em uma API que busca os dados do jogo League of Legends
da Riot Games API e trata os mesmo pra depois inserir em um banco de dados PostgreSQL.

Com este banco populado utilizamos o React para criar um relatorio Ad-hoc para os dados
do banco.

--- 

## Equipe
- Anderson Leandro - 2018019033
- Ikaro Siqueira - 2019000054
- Vinicius Rezende - 2019003940
- Lucas da Silva Marcelo - 2019004868
- Luiz Eduardo - 2019003136

--- 

## Como rodar o projeto
0. Clone o repositório

### Api
1. acesse a pastaa API com ``cd/API``
2. Mude o nomedo arquivo .envExample para .env e coloque nele sua chave de api da Riot Games
3. Rode o comando `npm install` na pasta do projeto
4. Rode o comando `npm start`
5. Restaure no postgresql o banco "loldatabase.backup"

OBS: caso vá utilizar a API para popular você deve colocar o nome do banco como : "loldatabase",
ou ao menos bater com o nome no database.js. Mas para fins de teste o nome não precisa ser igual.

--- 

### Relatorio Ad-Hoc
1. acesse a pastaa API com ``cd/relatorio``
2. Rode o comando `npm install` na pasta
3. Rode o comando `npm run dev`
--- 

Final: Com a API e o Relatorio rodando a aplicação é funcional.

## Api de terceiros utilizada

### Riot Games API
https://developer.riotgames.com/apis

