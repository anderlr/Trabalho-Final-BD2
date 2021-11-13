//const { Sequelize, Model, DataTypes } = require("sequelize");
const { DataTypes } = require('sequelize')
const connection = require("../database")
const Rockets = require('./rocket')

const Launches = connection.define("launches", {
    id:
    {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    flight_number:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name:
    {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date:
    {
        type: DataTypes.DATE,
        allowNull: false,
    },
    success:
    {
        type: DataTypes.BOOLEAN
    },
    id_rocket: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_launchpad: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
});
Launches.belongsTo(Rockets, { foreignKey: 'id_rocket', targetKey: 'id' })

Launches.sync()

module.exports = Launches;
    //             id_rocket integer REFERENCES rockets(id) NOT NULL,
    // id_launchpad integer REFERENCES launchpads(id) NOT NULL