//const { Sequelize, Model, DataTypes } = require("sequelize");
const { DataTypes } = require('sequelize')
const connection = require("../database")
const Summoner = require('./summoner')
const Match = require('./match')

const Match_summ_details = connection.define("match_summ_details", {
    summ_puuid:
    {
        type: DataTypes.STRING(78),
        primaryKey: true
    },
    matchid:
    {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
    },
    kills:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deaths:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assists:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    championName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    lane: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    goldEarned:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    win:
    {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});
Match_summ_details.belongsTo(Summoner, { foreignKey: 'summ_puuid', targetKey: 'puuid' })
Match_summ_details.belongsTo(Match, { foreignKey: 'matchid', targetKey: 'matchid' })

Match_summ_details.sync()

module.exports = Match_summ_details;