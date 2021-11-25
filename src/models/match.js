//const { Sequelize, Model, DataTypes } = require("sequelize");
const { DataTypes } = require('sequelize')
const connection = require("../database")
//const Rockets = require('./summoner')

const Match = connection.define("match", {
    matchid:
    {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    gameMode:
    {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    gameDuration:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gameName:
    {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    queueId:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_kills: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
Match.sync()

module.exports = Match;