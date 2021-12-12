var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

// Rota padrao
router.get('/', async (req, res) => {
    const parsed = JSON.parse(req.query[0])
    const Matchid = parsed.matchid

    //colocando os filtros recebidos do front em um array para o sequelize
    const keys = Object.keys(parsed);
    const atributesFilter = []

    keys.forEach((key) => {
        if (parsed[key] == true) atributesFilter.push(key)
    });

    //se nenhum atributo foi para o filtro a consulta nao será feita
    if (atributesFilter.length == 0) {
        res.statusMessage = 'Nenhuma coluna selecionada';
        res.status(400).end();
    }
    else {
        atributesFilter.forEach((item, index) => {
            if (item == 'killsChart') atributesFilter[index] = 'kills'
            if (item == 'deathsChart') atributesFilter[index] = 'deaths'
            if (item == 'assistsChart') atributesFilter[index] = 'assists'
            if (item == 'goldEarnedChart') atributesFilter[index] = 'goldEarned'
        })
        const nameList = []
        try {
            //encontrando a partida fornecida
            const search = await Match_summ_details.findAll({ where: { matchid: Matchid }, attributes: atributesFilter });
            const searchSummoners = await Match_summ_details.findAll({ where: { matchid: Matchid }, attributes: ['summ_puuid'] });

            if (search != null && searchSummoners != null) {
                for (const summ of searchSummoners) {
                    const searchName = await Summoner.findOne({ where: { puuid: summ.summ_puuid }, attributes: ['name'] });
                    if (searchName != null) {
                        nameList.push(searchName.dataValues.name)
                    }
                }
            }

            nameList.forEach((item, index) => {
                search[index].dataValues.name = item
            })
            var goldTotal = 0
            search.forEach((data) => {
                goldTotal += data.dataValues.goldEarned
            })

            search.forEach((data, index) => {
                search[index].dataValues["goldEarned(%)"] = (data.dataValues.goldEarned / goldTotal) * 100
                delete search[index].dataValues.goldEarned
            })
            res.send(JSON.stringify(search))

        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }

});

module.exports = router;
