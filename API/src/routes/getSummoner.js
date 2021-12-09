var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

var example = "This is a summoner!"
// Rota padrao
router.get('/', async (req, res) => {
    let summonerName = (req.query.SummonerName)
    let colName = (req.query.Name)
    let colProfileIconId = (req.query.ProfileIconId)
    let colSummonerLevel = (req.query.SummonerLevel)
    if (summonerName == 'Kinky Freak') summonerName = 'Kinky  Freak'
    //console.log(req.query)
    try {
        const search = await Summoner.findOne({ where: { name: summonerName } });
        //console.log(search.dataValues)
        if (search != null) {
            res.send(search.dataValues).status(200);
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(404)
    }
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About!');
});

module.exports = router;
