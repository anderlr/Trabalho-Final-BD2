var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

// Rota padrao
router.get('/', async (req, res) => {
    const parsed = JSON.parse(req.query[0])
    var summonerName = parsed.summonerName

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
        try {
            if (summonerName == 'Kinky Freak') summonerName = 'Kinky  Freak'
            //encontrando o puuid do jogador
            const searchSumm = await Summoner.findOne({ where: { name: summonerName }, attributes: ['puuid'] });
            if (searchSumm != null) {
                const search = await Match_summ_details.findAll({ where: { summ_puuid: searchSumm.dataValues.puuid }, attributes: atributesFilter });
                if (search != null) {
                    console.log(search)
                    res.send(search);
                }
                else {
                    res.status(404).send('Not Found')
                }

            }

        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }

});

module.exports = router;
