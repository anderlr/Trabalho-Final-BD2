var express = require('express');
var router = express.Router();
const axios = require('axios');
const Match = require('../models/match');
const Summoner = require('../models/summoner');
const Match_summ_details = require('../models/match_summ_details');

require('dotenv').config()

const username = "edwardbunker"
const puuid = "_7d_-Qcfk2HF0Ad6ZEZ5XyTdSU_wpdombMr_kCgZJL-DNnYqRcEMduMSlXJ0pJDV7BI1v-Ix8SKYOw"


const getOneSummoner = async () => {

    const { data: summoner } = await axios({
        method: "get",
        url: `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.API_KEY}`
    });

    const filteredSummoner =
    {
        puuid: summoner.puuid,
        profileIconid: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel
    }
    return filteredSummoner
}

const getMatches = async (quantidade) => {
    const { data: matches } = await axios({
        method: "get",
        url: `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${quantidade}&api_key=${process.env.API_KEY}`
    });
    return matches
}

const getMatchDetails = async (matchid) => {
    const filteredMatchDetails = []
    let totalKillCounter = 0

    const { data: match_details } = await axios({
        method: "get",
        url: `https://americas.api.riotgames.com/lol/match/v5/matches/${matchid}?api_key=${process.env.API_KEY}`
    });
    //console.log(match_details.info.participants[0].puuid)

    const participants = match_details.info.participants

    participants.forEach((player) => {
        totalKillCounter += player.kills
        filteredMatchDetails.push(
            {
                summ_puuid: player.puuid,
                matchid: matchid,
                kills: player.kills,
                deaths: player.deaths,
                assists: player.assists,
                championName: player.championName,
                lane: player.lane,
                goldEarned: player.goldEarned,
                win: player.win
            }
        )
    }
    )
    const filteredMatch =
    {
        matchid: matchid,
        gameMode: match_details.info.gameMode,
        gameDuration: match_details.info.gameDuration,
        gameName: match_details.info.gameName,
        queueId: match_details.info.queueId,
        total_kills: totalKillCounter
    }

    const filteredMatchData = { filteredMatchDetails, filteredMatch }
    console.log(filteredMatchData)
    return filteredMatchData
}


// Rota padrao
router.get('/', async (req, res) => {
    const summoner = await getOneSummoner() //busca um jogador
    const matches = await getMatches(20)//busca uma quantidade n de partidas do jogador
    const match = await getMatchDetails(matches[0])

    // 1 - com o nick de alguem pega o puuid
    // 2 - com o puuid busca o id de uma partida
    // 3 - com o id da partida busca essa partida
    // 4 - insere partida
    // 5 - pra cada usuario, insere ele e o tupla na tabela match_summ_details

    // const launches = await getLaunches()

    //console.log("rockets data:", rockets.length)
    //console.log(launches)
    //console.log(rockets)
    //console.log(launchpads)

    // rockets.forEach((rkt) => {
    //     Rockets.create(rkt);
    // })

    // launches.forEach((lnc) => {
    //     Launches.create(lnc);
    // })

    // res.status(200).send(launchpads)

    res.sendStatus(200)
});
// define the about route
router.get('/about', function (req, res) {
    res.send('About Rockets!');
});

module.exports = router;
