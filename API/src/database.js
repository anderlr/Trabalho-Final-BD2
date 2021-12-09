
const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/spacex')
const sequelize = new Sequelize('loldatabase', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate().then(() => {
    console.log('Conexão com banco estabelecida com sucesso!');
});


module.exports = sequelize