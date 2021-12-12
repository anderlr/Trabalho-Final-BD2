var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

// Rota padrao
router.get('/', async (req, res) => {
    const parsed = JSON.parse(req.query[0])
    let summonerNumber = (parsed.SummonerNumber)

    //colocando os filtros recebidos do front em um array para o sequelize
    const keys = Object.keys(parsed);
    const atributesFilter = []
    const atributesAllFilter = ['name', 'summonerLevel', 'profileIconid']

    keys.forEach((key) => {
        if (parsed[key] == true) atributesFilter.push(key)
    });

    //se nenhum atributo foi para o filtro a consulta nao será feita
    if (atributesFilter.length == 0) {
        res.statusMessage = 'Nenhuma coluna selecionada';
        res.status(400).end();
    }
    else if (summonerNumber == 0) {
        res.statusMessage = 'Nenhuma quantidade selecionada';
        res.status(400).end();
    }
    else {
        try {
            const search = await Summoner.findAll({ limit: summonerNumber });
            if (search != null) {
                //deletando os atributos indesejados
                search.forEach((data) => {
                    console.log(data.dataValues)
                    atributesAllFilter.forEach((att) => {
                        if (data.dataValues[`${att}`] && !atributesFilter.includes(att)) {
                            delete data.dataValues[`${att}`]
                        }
                    })
                })
                res.send(search);
            }
            else {
                res.status(404).send('Not Found')
            }

        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }

});

module.exports = router;
