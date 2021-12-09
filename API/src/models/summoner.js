//const { Sequelize, Model, DataTypes } = require("sequelize");
const { DataTypes } = require('sequelize')
const connection = require("../database")

const Summoner = connection.define("summoner", {
    name:
    {
        type: DataTypes.STRING(78),
        unique: true
    },
    puuid:
    {
        type: DataTypes.STRING(78),
        primaryKey: true
    },
    profileIconid:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    summonerLevel:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
Summoner.sync()

module.exports = Summoner;