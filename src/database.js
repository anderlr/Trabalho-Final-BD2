
const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/spacex')
const sequelize = new Sequelize('loldatabase_exemplo', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log('Conexão com banco estabelecida com sucesso!');
});


module.exports = sequelize