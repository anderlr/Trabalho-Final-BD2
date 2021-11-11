const express = require("express");
const { Sequelize } = require('sequelize');

const app = express();
app.use(express.json());

var insertData = require('./routes/insertData');
app.listen(5000, () => {
    console.log("Inicializado");
    console.log(`Servidor rodando localmente em: http://localhost:5000`);
});

app.use('/insertData', insertData); //rotas para obter foguete

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/spacex') // Example for postgres

sequelize.authenticate().then(() => {
    console.log('Conexão com banco estabelecida com sucesso!');
});














//==============================Exemplo de conexão com postgresql==============================
//IMPORTANTE: Lembrar de inslatar o pacote pg do npm
// const { Pool } = require("pg");

// const pool = new Pool({
//     connectionString: `postgres://postgres:root@localhost:5432/injection`,
// });

// pool.on("connect", () => {
//     console.log("Online");
// });

//==============================Exemplos de rotas de requisição com Express==============================
// app.get("/usuarios", async (req, res) => {
//     // console.log(req.body.query);
//     const algo = await pool.query(
//         `select * from usuarios where username = ${req.body.query}`
//     );
//     res.status(200).json(algo.rows);
// });

// app.post("/usuarios", async (req, res) => {
//     const { rows: user } = await pool.query(
//         "INSERT INTO usuarios (username, password) VALUES ($1, $2)",
//         [req.body.user, req.body.password]
//     );
//     res.status(200).send("success");
// });