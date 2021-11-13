//const { Sequelize, Model, DataTypes } = require("sequelize");
const { DataTypes } = require('sequelize')
const connection = require("../database")

const Rockets = connection.define("rocket", {
    id:
    {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    name:
    {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    height:
    {
        type: DataTypes.REAL,
        allowNull: false,
    },
    mass:
    {
        type: DataTypes.REAL,
        allowNull: false,
    },
    stages:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    first_flight:
    {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

Rockets.sync()

module.exports = Rockets;