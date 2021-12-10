var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

// Rota padrao
router.get('/', async (req, res) => {
    const parsed = JSON.parse(req.query[0])
    let summonerName = (parsed.SummonerName)

    //colocando os filtros recebidos do front em um array para o sequelize
    const keys = Object.keys(parsed);
    const atributesFilter = []
    keys.forEach((key, index) => {
        if (parsed[key] == true) atributesFilter.push(key)
    });

    //se nenhum atributo foi para o filtro a consulta nao será feita
    if (atributesFilter.length == 0) {
        res.statusMessage = 'Nenhuma coluna selecionada';
        res.status(400).end();
    }
    else {
        //corrigindo o unico nome diferente no banco
        if (summonerName == 'Kinky Freak') summonerName = 'Kinky  Freak'
        try {
            const search = await Summoner.findOne({ where: { name: summonerName }, attributes: atributesFilter });
            if (search != null) {
                res.send(search.dataValues);
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
// define the about route
router.get('/about', function (req, res) {
    res.send('About!');
});

module.exports = router;
